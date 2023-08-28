import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class MicroserviceTestingDto {
    @ApiProperty({example: 'auth', description: "название микросервиса"})
    @IsString({message: "Должна быть строка"})
    title: string;

    @ApiProperty({example: "микросервис запущен", description: "Описание действия"})
    @IsString({message: "Должна быть строка"})
    message: string;
}