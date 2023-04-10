import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employees } from "./entity/Employee"
import { Teams } from "./entity/Team"
import { Companies } from "./entity/Company"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "kozel77",
    database: "company-teams-management",
    synchronize: true,
    logging: false,
    entities: [Employees, Teams, Companies],
    migrations: ["src/migratins/*.ts"],
    migrationsTableName: "migrations",
    subscribers: [],
})
