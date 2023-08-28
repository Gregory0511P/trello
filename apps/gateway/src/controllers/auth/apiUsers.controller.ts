import {Body, Controller, Delete, Get, Inject, Param, Post, Patch, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {
    AdminOrCurrentUserGuard,
    RoleAddDto,
    Roles,
    RolesGuard,
    User,
    UserRegistrationDto
} from "@app/common";
import {Observable} from "rxjs";
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";


@Controller('users')
export class ApiUsersController {
    constructor(@Inject('USERS') private readonly usersClient: ClientProxy) {
    }

    @ApiOperation({
        summary: `Создание пользователя. Первый зарегистрированный пользователь получает роль ADMIN`
    })
    @ApiResponse({status: 201, type: User})
    @Post()
    async registration(@Body() userRegistrationDto: UserRegistrationDto): Promise<Observable<User>> {
        return this.usersClient.send({cmd: 'registration'}, {userRegistrationDto});
    };

    @ApiOperation({summary: "Получить всех пользователей. Необходима роль Администратора"})
    @ApiResponse({status: 200, type: [User]})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(): Promise<Observable<User[]>> {
        return this.usersClient.send({cmd: 'get-all-users'}, {});
    };

    @ApiOperation({
        summary: "Получить пользователя по id. " +
            "Необходима роль Администратора или быть этим пользователем"
    })
    @ApiResponse({status: 200, type: User})
    @ApiParam({name: "id", example: 1})
    @UseGuards(AdminOrCurrentUserGuard)
    @Get('/:id')
    async getById(@Param('id') id: string): Promise<Observable<User>> {
        return this.usersClient.send({cmd: 'get-user-by-id'}, {id});
    };

    @ApiOperation({
        summary: "Получить пользователя по email. Необходима роль Администратора" +
            " или быть этим пользователем"
    })
    @ApiResponse({status: 200, type: User})
    @ApiParam({name: "email", example: "ivanov@gmail.com"})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/email/:email')
    async getByEmail(@Param('username') email: string): Promise<Observable<User>> {
        return this.usersClient.send({cmd: 'get-user-by-email'}, {email});
    };

    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/username/:username')
    async getByUserName(@Param('username') username: string): Promise<Observable<User>> {
        return this.usersClient.send({cmd: 'get-user-by-userName'}, {username});
    };

    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Patch('/role')
    async addOrUpdateRole(@Body() roleAddDto: RoleAddDto): Promise<void> {
        await this.usersClient.emit('add-or-update-user-role', {roleAddDto});
    }

    @UseGuards(AdminOrCurrentUserGuard)
    @Patch()
    async update(@Body() userRegistrationDto: UserRegistrationDto, @Body() id: string): Promise<void> {
        await this.usersClient.emit('update-user', {userRegistrationDto, id})
    };

    @UseGuards(AdminOrCurrentUserGuard)
    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<void> {
        this.usersClient.emit('delete-user', {id})
    };
}