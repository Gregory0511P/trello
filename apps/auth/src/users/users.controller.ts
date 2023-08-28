import {Controller} from '@nestjs/common';
import {UsersService} from './users.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {User} from "@app/common";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @MessagePattern({cmd: 'registration'})
    async registration(@Payload() payload): Promise<User> {
        console.log(payload)
        return await this.usersService.registration(payload.userRegistrationDto);
    };

    @MessagePattern({cmd: 'get-all-users'})
    async getAll(): Promise<Array<User>> {
        return await this.usersService.getAll();
    };

    @MessagePattern({cmd: 'get-user-by-id'})
    async getById(@Payload() payload): Promise<User> {
        return await this.usersService.getById(payload.id);
    };

    @MessagePattern({cmd: 'get-user-by-email'})
    async getByEmail(@Payload() payload): Promise<User> {
        return await this.usersService.getByEmail(payload.email);
    };

    @MessagePattern({cmd: 'get-user-by-userName'})
    async getByUserName(@Payload() payload): Promise<User> {
        return await this.usersService.getByUserName(payload.userName);
    };

    @EventPattern('add-or-update-user-role')
    async addOrUpdateRole(@Payload() payload): Promise<void> {
        console.log(payload)
        return await this.usersService.addOrUpdateRole(payload.roleAddDto);
    };

    @EventPattern('delete-user-role')
    async deleteRole(@Payload() payload): Promise<void> {
        await this.usersService.deleteRole(payload.id)
    }

    @EventPattern('delete-user')
    async delete(@Payload() payload): Promise<void> {
        await this.usersService.delete(payload.id);
    };

    @EventPattern('update-user')
    async update(@Payload() payload): Promise<void> {
        await this.usersService.update(payload.userRegistrationDto, payload.id);
    };
}
