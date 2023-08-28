import {Controller} from '@nestjs/common';
import {CommentsService} from './comments.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {Comment} from "@app/common";


@Controller()
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {
    }

    @MessagePattern({cmd: 'create-comment'})
    async create(@Payload() payload): Promise<Comment> {
        return await this.commentsService.create(payload.commentCreateDto, payload.user.userId, payload.parentId,
            payload.attachmentId)
    };

    @MessagePattern({cmd: 'get-all-comments'})
    async getAll(): Promise<Array<Comment>> {
        return await this.commentsService.getAll();
    };

    @MessagePattern({cmd: 'get-comment-by-id'})
    async getById(@Payload() payload): Promise<Comment> {
        return await this.commentsService.getById(payload.id);
    };

    @MessagePattern({cmd: 'get-comments-by-parent-id'})
    async getByParentId(@Payload() payload): Promise<Array<Comment>> {
        return await this.commentsService.getByParentId(payload.parentId);
    };

    @MessagePattern({cmd: 'get-comments-by-user-id'})
    async getByUserId(@Payload() payload): Promise<Array<Comment>> {
        return await this.commentsService.getByUserId(payload.userId);
    };

    @EventPattern('update-comment')
    async update(@Payload() payload): Promise<void> {
        await this.commentsService.update(payload.commentUpdateDto, payload.id);
    };

    @EventPattern('delete-comment')
    async delete(@Payload() payload): Promise<void> {
        await this.commentsService.delete(payload.id);
    };
}
