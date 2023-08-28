import {ApiProperty} from "@nestjs/swagger";

export class CardCreateDto {

    @ApiProperty({type: Number, description: 'User unique id', example: 1})
    userId: number;
    @ApiProperty({type: Number, description: 'List unique id', example: 1})
    listId: number;
    @ApiProperty({type: String, description: 'Card name', example: 'This is card title'})
    title: string;

}