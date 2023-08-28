import {Controller} from '@nestjs/common';
import {AuthService} from './auth.service';
import {MessagePattern, Payload} from "@nestjs/microservices";
import {MicroserviceTestingDto} from "@app/common";


@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @MessagePattern({cmd: "check-auth"})
    async checkMicroservice(): Promise<MicroserviceTestingDto> {
        return await this.authService.checkMicroservice();
    };

    @MessagePattern({cmd: "login"})
    async login(@Payload() payload): Promise<object> {
        return await this.authService.login(payload.userLoginDto);
    };

    @MessagePattern({cmd: "logout"})
    async logout(@Payload() payload): Promise<object> {
        return await this.authService.logout(payload.auth)
    };

}
