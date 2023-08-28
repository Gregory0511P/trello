import {ApiProperty} from "@nestjs/swagger";

export class BoardCreateDto {
    @ApiProperty({type: Number, description: 'Unique user id', example: 1})
    userId: number;
    @ApiProperty({type: String, description: 'Board name', example: 'This is board title'})
    title: string;
}