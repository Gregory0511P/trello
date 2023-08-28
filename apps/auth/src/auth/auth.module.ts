import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {Token} from "@app/common";
import {UsersModule} from "../users/users.module";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UsersModule,
        TypeOrmModule.forFeature([Token]),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get("JWT_SECRET"),
                signOptions: {
                    expiresIn: "24h"
                },
            }),
            inject: [ConfigService],
        }),
    ]
})

export class AuthModule{

}