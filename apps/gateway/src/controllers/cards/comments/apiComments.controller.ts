import {Body, Controller, Delete, Get, Inject, Param, Post, Patch} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {CommentCreateDto, CommentUpdateDto, CurrentUser, ICurrentUser} from "@app/common";
import {Observable} from "rxjs";

@Controller('comments')
export class ApiCommentsController {
    constructor(@Inject('COMMENTS') private readonly commentsClient: ClientProxy) {
    }

    @Post()
    async create(@CurrentUser() user: ICurrentUser, @Body() commentCreateDto: CommentCreateDto,
                 @Body() parentId?: number, @Body() attachmentId?: number):
        Promise<Observable<Comment>> {
        return this.commentsClient.send({cmd: 'create-comment'}, {
            commentCreateDto, user, parentId,
            attachmentId
        });
    };

    @Get()
    async getAll(): Promise<Observable<Comment[]>> {
        return this.commentsClient.send({cmd: 'get-all-comments'}, {});
    };

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<Observable<Comment>> {
        return this.commentsClient.send({cmd: 'get-comment-by-id'}, {id});
    };

    @Get('/parent/:parentId')
    async getByParentId(@Param('parentId') parentId: number): Promise<Observable<Comment[]>> {
        return this.commentsClient.send({cmd: 'get-comments-by-parent-id'}, {parentId});
    };

    @Get('/user/:userId')
    async getByUserId(@Param('userId') userId: number): Promise<Observable<Comment[]>> {
        return this.commentsClient.send({cmd: 'get-comments-by-user-id'}, {userId});
    };

    @Patch()
    async update(@Body() commentUpdateDto: CommentUpdateDto, @Body() id: number): Promise<void> {
        await this.commentsClient.emit('update-comment', {commentUpdateDto});
    };

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<void> {
        await this.commentsClient.emit('delete-comment', {id});
    };
}