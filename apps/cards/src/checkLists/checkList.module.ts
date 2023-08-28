import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CheckList} from "@app/common";
import {CheckListsService} from "./checkLists.service";
import {CheckListsController} from "./checkLists.controller";

@Module({
    controllers: [CheckListsController],
    providers: [CheckListsService],
    imports: [
        TypeOrmModule.forFeature([CheckList]),
    ],
    exports: [CheckListsService]
})

export class CheckListModule {
}