import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role, RoleCreateDto} from "@app/common";
import {Repository} from "typeorm";

@Injectable()
export class RolesService {
    constructor(@InjectRepository(Role) private readonly roleRepository: Repository<Role>) {
    }

    async create(roleCreateDto: RoleCreateDto): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {name: roleCreateDto.name}});
        if (role) {
            throw new HttpException(`Role ${role.name} is already exists`, HttpStatus.BAD_REQUEST);
        }
        const newRole = await this.roleRepository.create(roleCreateDto);
        await this.roleRepository.save(newRole);
        return newRole;
    };

    async getAll(): Promise<Array<Role>> {
        const roles = await this.roleRepository.find();
        return roles;
    };

    async getById(id: number): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {id: id}});
        return role;
    }

    async getByName(name: string): Promise<Role> {
        const role = await this.roleRepository.findOne({where: {name: name}});
        return role;
    }

    async delete(id: number): Promise<void> {
        await this.roleRepository.delete(id);
    };

    async update(roleCreateDto: RoleCreateDto, id: number): Promise<void> {
        await this.roleRepository.update(id, {...roleCreateDto});
    };
}
