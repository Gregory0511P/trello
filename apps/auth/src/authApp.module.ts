import {Module} from '@nestjs/common';
import {CommonModule, Role, Token, User, UsersDbModule} from "@app/common";
import {RefreshTokenStrategy} from "./utils/refreshToken.strategy";
import {AccessTokenStrategy} from "./utils/accessToken.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersModule} from "./users/users.module";
import {RolesModule} from "./roles/roles.module";
import {AuthModule} from "./auth/auth.module";


@Module({
    imports: [
        CommonModule,
        UsersDbModule,
        AuthModule,
        TypeOrmModule.forFeature([User, Role, Token]),
        UsersModule,
        RolesModule
    ],
    controllers: [],
    providers: [
        RefreshTokenStrategy,
        AccessTokenStrategy
    ]
})
export class AuthAppModule {
}
