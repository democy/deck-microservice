import { ConnectionManager } from "typeorm";

import { log } from '../log'

const { PG_DATABASE, PG_USER, PG_PASSWORD, PG_HOST, PG_PORT } = process.env || {}

const config: any = {
    type: 'postgres',
    host: PG_HOST,
    port: PG_PORT || 5432,
    username: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    entities: [
        './**/*.entity{.ts,.js}',
    ],
    synchronize: true
}


const connectionManager = new ConnectionManager();
export const connection = connectionManager.create(config);

(async () => {
    try {
        await connection.connect(); // performs connection
        log.info('PostgreSQL connection has been established successfully.');

    }
    catch (error) {
        log.error('Unable to connect to the database:', error);
        throw error

    }

})()
