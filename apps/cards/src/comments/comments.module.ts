import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Comment} from "@app/common";
import {CommentsController} from "./comments.controller";
import {CommentsService} from "./comments.service";

@Module({
    controllers: [CommentsController],
    providers: [CommentsService],
    imports: [
        TypeOrmModule.forFeature([Comment]),
    ],
    exports: [CommentsService]
})

export class CommentsModule {
}