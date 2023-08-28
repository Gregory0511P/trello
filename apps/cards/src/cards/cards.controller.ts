import {Controller} from '@nestjs/common';
import {CardsService} from './cards.service';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {CardCreateDto, CardUpdateDto} from "@app/common";

@Controller()
export class CardsController {
    constructor(private readonly cardsService: CardsService) {
    }

    @MessagePattern({cmd: 'check-cards'})
    checkMicroservice(): any {
        return this.cardsService.checkMicroservice();
    }

    @MessagePattern('get-cards-by-board-id')
    getCardsByBoardId(@Payload() boardId: number) {
        return this.cardsService.getCardsByBoardId(boardId)
    }

    @MessagePattern('create-card')
    create(@Payload() data: CardCreateDto) {
        return this.cardsService.create(data)
    }

    @EventPattern('update-card')
    update(@Payload() data: CardUpdateDto) {
        return this.cardsService.update(data)
    }

    @EventPattern('delete-card')
    delete(@Payload() cardId: number) {
        return this.cardsService.delete(cardId)
    }
}
