import {IsString} from "class-validator";

export class RoleCreateDto {

    @IsString({message: "Должна быть строка"})
    name: string;

    @IsString({message: "Должна быть строка"})
    description: string;
}