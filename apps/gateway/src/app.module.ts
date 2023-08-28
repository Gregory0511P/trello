import {Module} from '@nestjs/common';
import {ApiAuthController} from "./controllers/auth/apiAuth.controller";
import {ApiCardsController} from "./controllers/cards/cards/apiCards.controller";
import {CommonModule} from "@app/common";
import {ApiUsersController} from "./controllers/auth/apiUsers.controller";
import {ApiRolesController} from "./controllers/auth/apiRoles.controller";
import {JwtModule} from "@nestjs/jwt";
import {ApiListController} from "./controllers/cards/lists/apiLists.controller";
import {ApiBoardsController} from "./controllers/cards/boards/apiBoards.controller";
import {ApiAttachmentsController} from "./controllers/cards/attachments/apiAttachments.controller";
import {ApiCheckListsController} from "./controllers/cards/checkLists/apiCheckLists.controller";
import {ApiCheckListItemsController} from "./controllers/cards/checkListItems/apiCheckListItems.controller";
import {ApiCommentsController} from "./controllers/cards/comments/apiComments.controller";
import {ApiLabelsController} from "./controllers/cards/labels/apiLabels.controller";


@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || "SECRET",
            signOptions: {
                expiresIn: "24h"
            }
        }),
        CommonModule,
        CommonModule.registerRmq({name: 'AUTH'}),
        CommonModule.registerRmq({name: 'ATTACHMENTS'}),
        CommonModule.registerRmq({name: 'CHECKLISTITEMS'}),
        CommonModule.registerRmq({name: 'CHECKLISTS'}),
        CommonModule.registerRmq({name: 'COMMENTS'}),
        CommonModule.registerRmq({name: 'LABELS'}),
        CommonModule.registerRmq({name: 'USERS'}),
        CommonModule.registerRmq({name: 'ROLES'}),
        CommonModule.registerRmq({name: 'CARDS'}),
    ],
    controllers: [ApiAuthController, ApiCardsController, ApiUsersController, ApiRolesController,
        ApiListController, ApiBoardsController, ApiAttachmentsController, ApiCheckListsController,
        ApiCheckListItemsController, ApiCommentsController, ApiLabelsController],
    providers: [],
})
export class AppModule {
}
