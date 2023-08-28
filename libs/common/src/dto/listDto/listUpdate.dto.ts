import {ApiProperty} from "@nestjs/swagger";

export class ListUpdateDto {
    @ApiProperty({type: Number, description: 'Unique list id', example: 1})
    id: number
    @ApiProperty({type: String, description: 'New list name (optional)', example: 'This is new list title'})
    title?: string;
    @ApiProperty({type: Boolean, description: 'New list state: archived or not (optional)', example: true})
    archived?: boolean;
    @ApiProperty({type: Number, description: 'New list position on the board (optional)', example: 2})
    position?: number;
}