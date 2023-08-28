import {DataSource} from "typeorm";
import {ConfigService} from "@nestjs/config";

const configService = new ConfigService()

//@ts-ignore
const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: +configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USERS'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_USERS_DB'),
    entities: ['./libs/common/src/entities/auth/**/*.entity.ts'],
    migrations: ['./apps/auth/migrations/*.ts']
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })

export default AppDataSource