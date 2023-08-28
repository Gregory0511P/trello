import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {MicroserviceTestingDto} from "@app/common";
import {UserLoginDto} from "@app/common/dto/userDto/userLogin.dto";
import {Logout} from "@app/common";

@ApiTags('Авторизация')
@Controller('auth')
export class ApiAuthController {
    constructor(@Inject('USERS') private readonly authClient: ClientProxy) {
    }

    @ApiOperation({summary: 'Проверка микросервиса "auth"'})
    @ApiResponse({
        status: 200, description: 'объект с названием микросервиса и сообщением,' +
            ' если микросервис работает.', type: MicroserviceTestingDto
    })
    @Get()
    async checkMicroservice(): Promise<object> {
        return this.authClient.send({cmd: 'check-auth'}, {});
    };

    @ApiOperation({
        summary: `Авторизация через email и пароль. В ответ получаете jwt-token, который нужно 
    поместить в заголовки запроса ("Authorization: Bearer jwt-token)`
    })
    @ApiResponse({status: 200, type: String})
    @Post('/login')
    async login(@Body() userLoginDto: UserLoginDto): Promise<object> {
        return this.authClient.send({cmd: 'login'}, {userLoginDto});
    };

    @ApiOperation({summary: "Выход из профиля"})
    @ApiResponse({status: 200})
    @Get('logout')
    async logout(@Logout() auth): Promise<object> {
        return this.authClient.send({cmd: 'logout'}, {auth});
    };
}
