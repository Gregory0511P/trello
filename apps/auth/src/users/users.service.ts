import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Role, RoleAddDto, User, UserUpdateDto} from "@app/common";
import {Repository} from "typeorm";
import {UserRegistrationDto} from "@app/common";
import {RolesService} from "../roles/roles.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                private readonly rolesService: RolesService) {
    };

    async registration(userRegistrationDto: UserRegistrationDto): Promise<User> {
        const hashPassword = await bcrypt.hash(userRegistrationDto.password, 5)
        const existingUserByUserName = await this.userRepository.findOne(
            {where: {userName: userRegistrationDto.userName}});
        const existingUserByEmail = await this.userRepository.findOne(
            {where: {email: userRegistrationDto.email}});
        if (existingUserByUserName) {
            throw new HttpException(`${existingUserByUserName.userName} is already exists`,
                HttpStatus.BAD_REQUEST);
        }
        if (existingUserByEmail) {
            throw new HttpException(`${existingUserByEmail.email} is already exists`, HttpStatus.BAD_REQUEST);
        }
        const users = await this.userRepository.find();
        if (users.length === 0) {
            const role = await this.rolesService.create({name: 'SUPERUSER', description: 'Супер пользователь'});
            const user = await this.userRepository.create({...userRegistrationDto, password: hashPassword});
            user.role = role;
            //user.roleId = role.id;
            await this.userRepository.save(user);
            return user;
        }
        const user = await this.userRepository.create({...userRegistrationDto, password: hashPassword});
        //if (userRegistrationDto.roleId) {
        if (userRegistrationDto.roleName) {
            //const role = await this.rolesService.getById(userRegistrationDto.roleId);
            const role = await this.rolesService.getByName(userRegistrationDto.roleName);
            if (role) {
                user.role = role
            }
            if (!role) {
                throw new HttpException(`This role doesn't exist`, HttpStatus.BAD_REQUEST);
            }
        }

        await this.userRepository.save(user)
        return user;
    };

    async getAll(): Promise<Array<User>> {
        const users = await this.userRepository.find({relations: {role: true}});
        return users
    };

    async getById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({where: {id: id}, relations: {role: true}});
        return user;
    };

    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {email: email}, relations: {role: true}});
        return user;
    };

    async getByUserName(userName: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {userName: userName}, relations: {role: true}});
        return user;
    };

    async addOrUpdateRole(roleAddDto: RoleAddDto): Promise<void> {
        const existingUser = await this.userRepository.findOne({where: {id: roleAddDto.id}});
        if (existingUser.role) {
            const existingRole = await this.rolesService.getByName(roleAddDto.role);
            if (existingRole) {
                //await this.userRepository.update(roleAddDto.id, {role: existingRole, roleId: existingRole.id});
                await this.userRepository.update(roleAddDto.id, {role: existingRole});
            }
            if (!existingRole) {
                throw  new HttpException(`${roleAddDto.role} doesn't exist`, HttpStatus.BAD_REQUEST)
            }
        }
        const userRole = await this.rolesService.getByName(roleAddDto.role);
        //await this.userRepository.update(roleAddDto.id, {role: userRole, roleId: userRole.id});
        await this.userRepository.update(roleAddDto.id, {role: userRole});
    };

    async deleteRole(id: number): Promise<void> {
        //await this.userRepository.update(id, {role: null, roleId: null});
        await this.userRepository.update(id, {role: null});

    }

    async delete(id: number): Promise<void> {
        await this.userRepository.findOne({where: {id: id}});
    };

    async update(userUpdateDto: UserUpdateDto, id: number): Promise<void> {
        await this.userRepository.update(id, userUpdateDto);
    }
}
