//import {Card} from "@app/common/entities/cards/cardEntity/card.entity";
import {Attachment} from "@app/common";
import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CommentCreateDto {

    @IsString({message: "Должна быть строка"})
    comment: string;

    @ApiProperty({example: "1", description: "id карточки"})
    @IsNumber()
    cardId: number;

    /*card: Card;

    child?: Comment;

    parent?: Comment[];

    attachment?: Attachment;*/
}