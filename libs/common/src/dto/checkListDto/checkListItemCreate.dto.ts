import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";


export class CheckListItemCreateDto {

    @ApiProperty({example: "выполнить что-то", description: "элемент списка"})
    @IsString({message: "Должна быть строка"})
    title: string;

    @ApiProperty({example: "1", description: "id списка"})
    @IsNumber()
    checkListId: number;
}