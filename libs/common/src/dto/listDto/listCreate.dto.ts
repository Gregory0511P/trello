import {ApiProperty} from "@nestjs/swagger";

export class ListCreateDto {
    @ApiProperty({type: Number, description: 'Board unique id', example: 1})
    boardId: number;
    @ApiProperty({type: String, description: 'List name', example: 'This is list title'})
    title: string;

}