import {Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {UsersService} from "./users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Role, User} from "@app/common";
import {RolesModule} from "../roles/roles.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        RolesModule
    ],
    exports: [UsersService]
})
export class UsersModule {
}