import {CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";

export class AdminOrCurrentUserGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                @Inject('USERS') private readonly usersClient: ClientProxy) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        const [bearer, token] = req.headers.authorization.split(' ');

        if (bearer !== "Bearer" || !token) {
            throw new UnauthorizedException({message: "Пользователь не авторизован"})
        }
        const userFromToken = await this.jwtService.decode(token);
        const userId = userFromToken['id'];
        const user = await lastValueFrom(this.usersClient.send({cmd: 'get-user-by-id'}, {userId}));
        const matchingEmails = user.email === userFromToken['email'];
        const matchingUserNames = user.userName === userFromToken['userName'];

        if (matchingEmails && matchingUserNames) {
            const isAdmin = userFromToken['role']['name'] === 'ADMIN' || 'SUPERUSER';

            if (isAdmin || userId === req.body.id) {
                return true
            }
        }
        throw new HttpException({message: "В доступе отказано"}, HttpStatus.FORBIDDEN)
    }

}