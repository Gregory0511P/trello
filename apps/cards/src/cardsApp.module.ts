import {Module} from '@nestjs/common';
import {CommonModule} from "@app/common";
import {ListsModule} from "./lists/lists.module";
import {BoardsModule} from "./boards/boards.module";
import {CheckListModule} from "./checkLists/checkList.module";
import {CheckListItemModule} from "./checkListItem/checkListItem.module";
import {CommentsModule} from "./comments/comments.module";
import {LabelModule} from "./labels/label.module";
import {CardsDbModule} from "@app/common/modules/cardsDb.module";
import {AttachmentsModule} from "./attachments/attachments.module";
import {CardsModule} from "./cards/cards.module";


@Module({
    imports: [
        CommonModule,
        CardsDbModule,
        AttachmentsModule,
        CardsModule,
        ListsModule,
        BoardsModule,
        CheckListModule,
        CheckListItemModule,
        CommentsModule,
        LabelModule,
    ],
    controllers: [],
    providers: []
})
export class CardsAppModule {
}
