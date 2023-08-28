import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {lastValueFrom} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {ClientProxy} from "@nestjs/microservices";

@Injectable()
export class JwtAuthGuard implements CanActivate {
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
            req.user = userFromToken;
            return true;
        }
        throw new UnauthorizedException({message: "Пользователь не авторизован"});
    };
}