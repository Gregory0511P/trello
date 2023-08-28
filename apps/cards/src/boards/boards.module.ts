import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BoardsController} from "./boards.controller";
import {BoardsService} from "./boards.service";
import {BoardEntity} from "@app/common";

@Module({
	controllers: [BoardsController],
	providers: [BoardsService],
	imports: [
		TypeOrmModule.forFeature([BoardEntity])
	],
	exports: [BoardsService]
})

export class BoardsModule {
}