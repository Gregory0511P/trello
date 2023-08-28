import {IsEmail, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserRegistrationDto {

    @ApiProperty({example: "billy", description: "имя пользователя"})
    @IsString({message: "Должна быть строка"})
    userName: string;

    @ApiProperty({example: "bill@gmail.com", description: "Почтовый адрес"})
    @IsString({message: "Должна быть строка"})
    @IsEmail({}, {message: "Email должен быть - ivanov@gmail.com"})
    email: string;

    @ApiProperty({example: "t213fggf", description: "Пароль"})
    @IsString({message: "Должна быть строка"})
    password: string;

    @ApiProperty({example: "ADMIN", description: "Необязательный параметр роли. Нужен чтобы создать админа"})
    //roleId?: number;
    roleName?: string
}