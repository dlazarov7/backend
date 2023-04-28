import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employee } from "./models/Employee"
import { Team } from "./models/Team"
import { Company} from "./models/Company"
import * as dotenv from "dotenv";
dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    //cache:true,
    entities: [Employee, Team, Company],
    migrations: ["src/migrations/*.ts","src/seeds/*.ts"],
    migrationsTableName: "migrations",
    subscribers: []
})
