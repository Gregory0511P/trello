import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AttachmentsController} from "./attachments.controller";
import {AttachmentsService} from "./attachments.service";
import {Attachment} from "@app/common";

@Module({
    controllers: [AttachmentsController],
    providers: [AttachmentsService],
    imports: [
        TypeOrmModule.forFeature([Attachment]),
    ],
    exports: [AttachmentsService]
})

export class AttachmentsModule {
}