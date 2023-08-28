import {IsNumber, IsString} from "class-validator";

export class RoleAddDto {

    @IsString({message: "Должна быть строка"})
    role: string;

    @IsNumber()
    id: number;
}