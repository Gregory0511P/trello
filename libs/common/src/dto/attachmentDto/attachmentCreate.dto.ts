import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AttachmentCreateDto {

    @ApiProperty({example: "someName.txt", description: "наименование файла"})
    @IsString({message: "Должна быть строка"})
    filename: string;

    @ApiProperty({example: "./some/someName.txt", description: "путь к файлу"})
    @IsString({message: "Должна быть строка"})
    filePath: string;

    @ApiProperty({example: "1", description: "id карточки"})
    @IsNumber()
    cardId: number;
}