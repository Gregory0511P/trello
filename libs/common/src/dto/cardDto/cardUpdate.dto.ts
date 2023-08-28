import {ApiProperty} from "@nestjs/swagger";

export class CardUpdateDto {
    @ApiProperty({type: Number, description: 'Unique card id', example: 1})
    id: number

    @ApiProperty({type: Number, description: 'New list id if moved (optional)', example: 1})
    listId?: number;

    @ApiProperty({type: [Number], description: 'new array of users who watch this card (optional)', example: [1, 2, 3]})
    usersWatch?: number[]

    @ApiProperty({type: String, description: 'New card name (optional)', example: 'This is new card title'})
    title?: string

    @ApiProperty({
        type: String,
        description: 'New card description (optional)',
        example: 'New instructions for the developer needed to complete the task'
    })
    description?: string

    @ApiProperty({type: Date, description: 'New task deadline (optional)', example: '2023-07-25T16:55:44.671Z'})
    dueDate?: Date

    @ApiProperty({
        type: String,
        description: 'New name of cover image (optional)',
        example: 'uploaded-cover-image.jpeg'
    })
    coverImage?: string;

    @ApiProperty({type: Boolean, description: 'New card state: archived or not (optional)', example: true})
    archived?: boolean;

    @ApiProperty({type: Number, description: 'New card position in the list (optional)', example: 2})
    position?: number;

}