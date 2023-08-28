import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";


export class CheckListCreateDto {

    @ApiProperty({example: "задачи", description: "список - checkList"})
    @IsString({message: "Должна быть строка"})
    title: string;

    @ApiProperty({example: "1", description: "id карточки"})
    @IsNumber()
    cardId: number;
}