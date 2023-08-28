import {NestFactory} from '@nestjs/core';
import {CardsAppModule} from "./cardsApp.module";
import {ConfigService} from "@nestjs/config";
import {CommonService} from "@app/common";

async function bootstrap() {
    const app = await NestFactory.create(CardsAppModule);

    const configService = app.get(ConfigService);
    const commonService = app.get(CommonService);

    const queue_cards = configService.get("RABBITMQ_CARDS_QUEUE");
    const queue_attachments = configService.get("RABBITMQ_ATTACHMENTS_QUEUE");
    const queue_checkLists = configService.get("RABBITMQ_CHECKLISTS_QUEUE");
    const queue_checkListItems = configService.get("RABBITMQ_CHECKLISTITEMS_QUEUE");
    const queue_comments = configService.get("RABBITMQ_COMMENTS_QUEUE");
    const queue_labels = configService.get("RABBITMQ_LABELS_QUEUE");
    const queue_lists = configService.get("RABBITMQ_LISTS_QUEUE");

    app.connectMicroservice(commonService.getRmqOptions(queue_cards, true));
    app.connectMicroservice(commonService.getRmqOptions(queue_attachments, true));
    app.connectMicroservice(commonService.getRmqOptions(queue_checkLists, true));
    app.connectMicroservice(commonService.getRmqOptions(queue_checkListItems, true));
    app.connectMicroservice(commonService.getRmqOptions(queue_comments, true));
    app.connectMicroservice(commonService.getRmqOptions(queue_lists, true));
    app.connectMicroservice(commonService.getRmqOptions(queue_labels, true));

    await app.startAllMicroservices()
}

bootstrap();
