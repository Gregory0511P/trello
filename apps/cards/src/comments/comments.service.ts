import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Comment, CommentCreateDto, CommentUpdateDto} from "@app/common";


@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>) {
    }

    async create(commentCreateDto: CommentCreateDto, userId: number, parentId?: number, attachmentId?: number): Promise<Comment> {
        if (parentId && attachmentId) {
            const childComment = await this.commentsRepository.create({...commentCreateDto, userId: userId});
            childComment.attachmentId = attachmentId;
            childComment.parentId = parentId;
            return childComment;
        }
        if (attachmentId) {
            const childComment = await this.commentsRepository.create({...commentCreateDto, userId: userId});

            childComment.attachmentId = +attachmentId;
            return childComment;
        }
        if (parentId) {
            const childComment = await this.commentsRepository.create({...commentCreateDto, userId: userId});
            childComment.parentId = parentId;
            return childComment;
        }
        const comment = await this.commentsRepository.create({...commentCreateDto, userId: userId});
        return comment;
    };

    async getAll(): Promise<Array<Comment>> {
        const comments = await this.commentsRepository.find();
        return comments;
    };

    async getById(id: number): Promise<Comment> {
        const comment = await this.commentsRepository.findOne({where: {id: id}})
        return comment;
    };

    async getByParentId(parentId: number): Promise<Array<Comment>> {
        const comments = await this.commentsRepository.find({where: {parentId: parentId}});
        return comments;
    };

    async getByUserId(userId: number): Promise<Array<Comment>> {
        const comments = await this.commentsRepository.find({where: {userId: userId}});
        return comments;
    }

    async update(commentUpdateDto: CommentUpdateDto, id: string): Promise<void> {
        await this.commentsRepository.update(id, commentUpdateDto);
    };

    async delete(id: number): Promise<void> {
        await this.commentsRepository.delete(id)
    };
}
