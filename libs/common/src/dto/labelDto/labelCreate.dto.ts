import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LabelCreateDto {

    @ApiProperty({example: "example", description: "наименование этикетки"})
    @IsString({message: "Должна быть строка"})
    title: string;

    @ApiProperty({example: "red", description: "цвет этикетки"})
    @IsString({message: "Должна быть строка"})
    color: string;

    @ApiProperty({example: "1", description: "id карточки"})
    @IsNumber()
    cardId: number;
}