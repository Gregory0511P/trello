import {CanActivate, ExecutionContext, HttpException, HttpStatus, Inject, UnauthorizedException} from "@nestjs/common";
import {lastValueFrom} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {ClientProxy} from "@nestjs/microservices";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "@app/common/decorators/roles.decorator";

export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector,
                @Inject('USERS') private readonly usersClient: ClientProxy
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (!requiredRoles) {
            return true;
        }

        const [bearer, token] = req.headers.authorization.split(' ');

        if (bearer !== "Bearer" || !token
        ) {
            throw new UnauthorizedException({message: "Пользователь не авторизован"})
        }

        const userFromToken = await this.jwtService.decode(token);
        const userId = userFromToken['id'];
        const user = await lastValueFrom(this.usersClient.send({cmd: 'get-user-by-id'}, {userId}));
        const matchingEmails = user.email === userFromToken['email'];
        const matchingUserNames = user.userName === userFromToken['userName'];

        if (matchingEmails && matchingUserNames) {
            for(let index in requiredRoles){
                if(user['role']['name'] === requiredRoles[index]) {
                    return true
                }
            }
        }
        throw new HttpException({message: "В доступе отказано"}, HttpStatus.FORBIDDEN);
    }

}