import "reflect-metadata"
import { DataSource } from "typeorm"
import { Employee } from "./entity/Employee"
import { Team } from "./entity/Team"
import { Company} from "./entity/Company"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "kozel77",
    database: "company-teams-management",
    synchronize: false,
    logging: true,
    entities: [Employee, Team, Company],
    migrations: ["src/migrations/*.ts","src/seeds/*.ts"],
    migrationsTableName: "migrations",
    subscribers: []
})
