import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ListCreateDto, ListUpdateDto} from "@app/common";
import {ListEntity} from "@app/common";

@ApiTags('Lists')
@Controller('lists')
export class ApiListController {
    constructor(@Inject('CARDS') private readonly cardsClient: ClientProxy) {
    }

    @ApiOperation({summary: 'Get all lists of a board by boardId'})
    @ApiResponse({
        status: 200,
        description: 'Returns all lists of a board if found, or an empty list',
        type: [ListEntity]
    })
    @ApiParam({name: 'boardId', description: 'Unique board ID', type: Number})
    @Get(':boardId')
    getListsByBoardId(@Param('boardId', ParseIntPipe) boardId: number) {
        return this.cardsClient.send('get-lists-by-board-id', boardId)
    }

    @ApiOperation({summary: 'Add a new list to the board by boardId'})
    @ApiResponse({status: 201, description: 'List added to board', type: ListEntity})
    @ApiParam({name: 'boardId', description: 'Unique board ID', type: Number})
    @Post()
    create(@Body() data: ListCreateDto) {
        return this.cardsClient.send('create-list', data)
    }

    @ApiOperation({summary: 'Update list data by unique list id'})
    @ApiResponse({status: 200, description: 'List data updated'})
    @Patch()
    update(@Body() data: ListUpdateDto) {
        return this.cardsClient.emit('update-list', data)
    }

    @ApiOperation({summary: 'Delete list by unique list id'})
    @ApiResponse({status: 200, description: 'The list with this id has been deleted'})
    @ApiParam({name: 'listId', description: 'Unique list id', type: Number})
    @Delete(':listId')
    delete(@Param('listId', ParseIntPipe) listId: number) {
        return this.cardsClient.emit('delete-list', listId)
    }
}