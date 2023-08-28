import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
//import {AppDataSourceUsers} from "@app/common/config/typeorm.config";
import {ConfigService} from "@nestjs/config";
import {Attachment, BoardEntity, CardEntity, CheckList, CheckListItem, Comment, Label, ListEntity} from "@app/common";


@Module({
    imports: [
        //@ts-ignore
        TypeOrmModule.forRootAsync(
            {
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    type: "postgres",
                    schema: "public",
                    database: configService.get("POSTGRES_CARDS_DB"),
                    port: +configService.get("POSTGRES_PORT"),
                    host: configService.get("POSTGRES_HOST"),
                    username: configService.get("POSTGRES_USERS"),
                    password: configService.get("POSTGRES_PASSWORD"),
                    logging: configService.get('IS_PROD') === 'false',
                    synchronize: false,
                    autoLoadEntities: true,
                    entities: [CardEntity, BoardEntity, ListEntity, Attachment,
                        Label, CheckListItem, CheckList, Comment]
                    //entities: [join(process.cwd(), 'dist', 'apps', 'gateway', 'libs', 'common', 'src',
                    //    'entities', '**', '*.entity.{ts, js}')],
                    //migrations: [join(process.cwd(), 'migrations', '**', '*migration.ts')],
                    //migrationsRun: true,
                    //migrationsTableName: configService.get(`USERS_MIGRATIONS`),
                    //cli: {
                    //    migrationsDir: join(process.cwd(), 'dist', 'migrations')
                    //}
                })
            }
        )
    ],

})
/*@Module({
    imports: [
        TypeOrmModule.forRoot(AppDataSourceUsers.options)
    ]
})*/
export class CardsDbModule {
}

