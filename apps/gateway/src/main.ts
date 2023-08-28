import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import * as passport from "passport";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  const configService = app.get(ConfigService);

  //app.use(passport.initialize());
  //app.use(passport.session())

  const options = new DocumentBuilder()
      .setTitle("Api Documentation")
      .setDescription("Документация по api")
      .setVersion("1.0")
      .addTag("api")
      .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api/docs", app, document);


  await app.listen(configService.get('API_PORT'), () =>
      console.log(`GateWay запущен на порту ${configService.get('API_PORT')}`));
}
bootstrap();
