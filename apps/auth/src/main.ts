import { NestFactory } from '@nestjs/core';
import { AuthAppModule} from "./authApp.module";
import {ConfigService} from "@nestjs/config";
import {CommonService} from "@app/common";

async function bootstrap() {
  const app = await NestFactory.create(AuthAppModule);

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queueRoles = configService.get("RABBITMQ_ROLES_QUEUE");
  const queueUsers = configService.get("RABBITMQ_USERS_QUEUE");
  const queueAuth = configService.get("RABBITMQ_AUTH_QUEUE");

  app.connectMicroservice(commonService.getRmqOptions(queueRoles, true));
  app.connectMicroservice(commonService.getRmqOptions(queueUsers, true));
  app.connectMicroservice(commonService.getRmqOptions(queueAuth, true));

  await app.startAllMicroservices()
}
bootstrap();
