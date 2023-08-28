import {ApiProperty} from "@nestjs/swagger";

export class BoardUpdateDto {
    @ApiProperty({type: Number, description: 'Unique board id', example: 1})
    id: number;

    @ApiProperty({type: String, description: 'New board name', example: 'This is new board title'})
    title: string;
}