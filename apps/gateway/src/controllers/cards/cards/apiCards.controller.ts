import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CardEntity, ListEntity} from "@app/common";
import {CardCreateDto, CardUpdateDto} from "@app/common";


@ApiTags('Cards')
@Controller('cards')
export class ApiCardsController {

    constructor(@Inject('CARDS') private readonly cardsClient: ClientProxy) {
    }

    @ApiOperation({summary: 'Get all lists of cards with their cards by boardId'})
    @ApiResponse({status: 200, description: 'Returns all cards if found, or an empty list', type: [ListEntity]})
    @ApiParam({name: 'boardId', description: 'Unique board id', type: Number})
    @Get(':boardId')
    getCardsByBoardId(@Param('boardId', ParseIntPipe) boardId: number) {
        return this.cardsClient.send('get-cards-by-board-id', boardId)
    }

    @ApiOperation({summary: 'Add a new card by userId and listId'})
    @ApiResponse({status: 201, description: 'Card created', type: CardEntity})
    @Post()
    create(@Body() data: CardCreateDto) {
        return this.cardsClient.send('create-card', data)
    }

    @ApiOperation({summary: 'Update card by card id'})
    @ApiResponse({status: 200, description: 'Card updated'})
    @Patch()
    update(@Body() data: CardUpdateDto) {
        return this.cardsClient.emit('update-card', data);
    }

    @ApiOperation({summary: 'Delete card by card id'})
    @ApiResponse({status: 200, description: 'The card with this id has been deleted'})
    @ApiParam({name: 'cardId', description: 'Unique card id', type: Number})
    @Delete(':cardId')
    delete(@Param('cardId', ParseIntPipe) cardId: number) {
        return this.cardsClient.emit('delete-card', cardId);
    }
}