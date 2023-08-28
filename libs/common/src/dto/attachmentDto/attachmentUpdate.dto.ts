import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AttachmentUpdateDto {

    @ApiProperty({example: "example", description: "наименование доски"})
    @IsString({message: "Должна быть строка"})
    filename: string;

    @ApiProperty({example: "12", description: "id пользователя"})
    @IsString({message: "Должна быть строка"})
    filePath: string;

    @ApiProperty({example: "1", description: "id карточки"})
    @IsNumber()
    cardId: number;

    comments: object[]
}