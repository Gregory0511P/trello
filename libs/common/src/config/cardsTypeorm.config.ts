import {DataSource, DataSourceOptions} from 'typeorm';
import {config} from 'dotenv';
import {join} from 'path'
import {ConfigService} from "@nestjs/config";


/*config({path: join(process.cwd(), 'env')})
const configService = new ConfigService()

const options = (): DataSourceOptions => {
    const db = configService.get(`POSTGRES_USERS_DB`)
    console.log(configService.get('POSTGRES_PORT'))
    //if (!db) {
    //    throw new Error('No such database!')
    //}
    return {
        username: 'postgres',//configService.get(`POSTGRES_USERS`),
        password: 'postgres',//configService.get(`POSTGRES_PASSWORD`),
        host: 'localhost',//configService.get('POSTGRES_HOST'),
        database: 'users',//configService.get(`POSTGRES_USERS_DB`),
        port: 5432,//configService.get('POSTGRES_PORT'),
        type: 'postgres',
        schema: 'public',
        logging: configService.get('IS_PROD') === 'false',
        synchronize: false,
        //entities: [User, Role, Token],
        entities: [join('dist', 'apps', 'gateway', 'libs', 'common', 'src',
            'entities', '**', '*.entity{.js,.ts}')],
        migrations: [join(process.cwd(), 'migrations', '**', '*migration.js')],
        migrationsRun: true,
        migrationsTableName: configService.get(`MIGRATIONS_USERS`)
    }
}

export const AppDataSourceUsers = new DataSource(options())
//export const AppDataSourceCards = new DataSource(options('CARDS'))*/
const configService = new ConfigService()

//@ts-ignore
const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: +configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USERS'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_CARDS_DB'),
    entities: ['./libs/common/src/entities/cards/**/*.entity.ts'],//['*/**/*.entity.ts'],
    migrations: ['./apps/cards/migrations/*.ts']
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })

export default AppDataSource
