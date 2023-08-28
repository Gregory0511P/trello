import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {BoardEntity} from "@app/common";
import {BoardCreateDto, BoardUpdateDto} from "@app/common";


@ApiTags('Boards')
@Controller('boards')
export class ApiBoardsController {
    constructor(@Inject('CARDS') private readonly cardsClient: ClientProxy) {
    }

    @ApiOperation({summary: 'Get all boards by userId'})
    @ApiResponse({status: 200, description: 'Returns all boards if found, or an empty list', type: [BoardEntity]})
    @ApiParam({name: 'userId', description: 'Unique user id', type: Number})
    @Get(':userId')
    getByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return this.cardsClient.send('get-boards-by-user-id', userId)
    }

    @ApiOperation({summary: 'Add a new board by userId'})
    @ApiResponse({status: 201, description: 'Board created', type: BoardEntity})
    @ApiParam({name: 'userId', description: 'Unique user id', type: Number})
    @Post()
    create(@Body() data: BoardCreateDto) {
        return this.cardsClient.send('create-board', data)
    }

    @ApiOperation({summary: 'Update board by board id'})
    @ApiResponse({status: 200, description: 'Board updated'})
    @Patch()
    update(@Body() data: BoardUpdateDto) {
        return this.cardsClient.emit('update-board', data)
    }

    @ApiOperation({summary: 'Delete board by board id'})
    @ApiResponse({status: 200, description: 'The board with this id has been deleted'})
    @ApiParam({name: 'boardId', description: 'Unique board id', type: Number})
    @Delete('/:boardId')
    delete(@Param('boardId', ParseIntPipe) boardId: number) {
        return this.cardsClient.emit('delete-board', boardId)
    }
}