import { config } from "dotenv"
import { DataSource } from "typeorm"

config()

const databaseConfig: DataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || '0.0.0.0',
    port: parseInt(`${process.env.DATABASE_PORT || 5432}`, 10),
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || '',
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  })

export default databaseConfig