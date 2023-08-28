import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CardsController} from "./cards.controller";
import {CardsService} from "./cards.service";
import {CardEntity, ListEntity} from "@app/common";

@Module({
	controllers: [CardsController],
	providers: [
		CardsService
	],
	imports: [
		TypeOrmModule.forFeature([CardEntity, ListEntity]),
	],
	exports: [CardsService]
})

export class CardsModule {
}