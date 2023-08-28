import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ListsController} from "./lists.controller";
import {ListsService} from "./lists.service";
import {BoardEntity, ListEntity} from "@app/common";


@Module({
	controllers: [ListsController],
	providers: [ListsService],
	imports: [
		TypeOrmModule.forFeature([ListEntity, BoardEntity])
	],
	exports: [ListsService]
})

export class ListsModule {
}