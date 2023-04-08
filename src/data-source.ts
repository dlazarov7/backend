import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employees } from "./entity/Employees"
import { Teams } from "./entity/Teams"
import { Companies } from "./entity/Companies"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "kozel77",
    database: "company-teams-management",
    synchronize: true,
    logging: false,
    entities: [Employees,Teams,Companies],
    migrations: [],
    subscribers: [],
})
