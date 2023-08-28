import {BadRequestException, Injectable} from '@nestjs/common';
import {MicroserviceTestingDto, Role, Token, User} from "@app/common";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {UserLoginDto} from "@app/common";
import * as bcrypt from "bcryptjs";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Token) private readonly tokenRepository: Repository<Token>,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService) {
    }

    async checkMicroservice(): Promise<MicroserviceTestingDto> {
        return {title: 'auth', message: 'микросервис запущен'}
    }

    async login(userLoginDto: UserLoginDto): Promise<object> {
        const user = await this.usersService.getByEmail(userLoginDto.email);
        if (!user) {
            throw new BadRequestException("Пользователь не существует");
        }
        const passwordMatches = await bcrypt.compare(userLoginDto.password, user.password);
        if (!passwordMatches) {
            throw new BadRequestException("Неверный пароль");
        }
        const tokens = await this.generateTokens(user.id, user.userName, user.email, user.role);
        await this.createOrUpdateRefreshToken(tokens['refreshToken'], user.id);
        return tokens;
    };

    async logout(auth: string): Promise<object> {
        const user = this.jwtService.decode(auth.split(" ")[1]);
        const token = await this.tokenRepository.findOne({where: {userId: user['id']}});
        await this.tokenRepository.delete(token.id);
        return {
            msg: `Пользователь ${user['userName']} вышел из аккаунта`
        };
    };

    private async createOrUpdateRefreshToken(refreshToken: string, userId: number) {
        const token = await this.tokenRepository.findOne({where: {userId: userId}})
        if (!token) {
            const refToken = await this.tokenRepository.create({refreshToken: refreshToken, userId: userId});
            await this.tokenRepository.save(refToken);
            return;
        }
        await this.tokenRepository.update(token.id, {refreshToken: refreshToken});
        return;
    }

    private async generateTokens(id: number, userName: string, email: string, role: Role): Promise<object> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                    id,
                    userName,
                    email,
                    role
                },
                {
                    secret: this.configService.get('JWT_ACCESS_SECRET'),
                    expiresIn: '10m'
                }),
            this.jwtService.signAsync({
                    id,
                    userName,
                    email,
                    role
                },
                {
                    secret: this.configService.get('JWT_REFRESH_SECRET'),
                    expiresIn: '5d'
                })
        ])
        return {accessToken, refreshToken};
    }
}


