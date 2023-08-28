import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CheckListItem} from "@app/common";
import {CheckListItemController} from "./checkListItem.controller";
import {CheckListItemService} from "./checkListItem.service";

@Module({
    controllers: [CheckListItemController],
    providers: [CheckListItemService],
    imports: [
        TypeOrmModule.forFeature([CheckListItem]),
    ],
    exports: [CheckListItemService]
})

export class CheckListItemModule {
}