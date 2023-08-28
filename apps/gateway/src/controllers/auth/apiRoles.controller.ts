import {Body, Controller, Delete, Get, Inject, Param, Post, Patch, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {Role, RoleCreateDto, Roles, RolesGuard} from "@app/common";
import {AdminOrCurrentUserGuard} from "@app/common";
import {Observable} from "rxjs";


@Controller('roles')
export class ApiRolesController {
    constructor(@Inject('ROLES') private readonly rolesClient: ClientProxy) {
    }

    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post()
    async create(@Body() roleCreateDto: RoleCreateDto): Promise<Observable<Role>> {
        return this.rolesClient.send({cmd: 'create-role'}, {roleCreateDto});
    };

    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get()
    async getAll(): Promise<Observable<Role[]>> {
        return this.rolesClient.send({cmd: 'get-all-roles'}, {});
    }

    @UseGuards(AdminOrCurrentUserGuard)
    @Get('/:id')
    async getById(@Param('id') id: string): Promise<Observable<Role>> {
        return this.rolesClient.send({cmd: 'get-role-by-id'}, {id});
    };

    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/name/:name')
    async getByName(@Param('name') name: string): Promise<Observable<Role[]>> {
        return this.rolesClient.send({cmd: 'get-role-by-name'}, {name});
    };

    @UseGuards(AdminOrCurrentUserGuard)
    @Patch()
    async update(@Body() roleCreateDto: RoleCreateDto, @Body() id: string): Promise<Observable<void>> {
        return this.rolesClient.send({cmd: 'update-role'}, {roleCreateDto, id});
    }

    @UseGuards(AdminOrCurrentUserGuard)
    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<Observable<void>> {
        return this.rolesClient.send({cmd: 'delete-role'}, {id});
    }
}