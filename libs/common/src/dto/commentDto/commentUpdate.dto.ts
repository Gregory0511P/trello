import {IsString} from "class-validator";

export class CommentUpdateDto {

    @IsString({message: "Должна быть строка"})
    comment: string;
}