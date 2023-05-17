import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Team } from "./Team";
import { AutoMap } from "@automapper/classes";


@Entity({ name: "employees" })
export class Employee extends BaseEntity {

    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number

    @Column({
        name: "manager_id"
    })
    @AutoMap()
    managerId: number

    @Column({
        name: "team_id"
    })
    @AutoMap()
    teamId: number

    @Column({
        name: "first_name"
    })
    @AutoMap()
    firstName: string

    @Column({
        name: "last_name"
    })
    @AutoMap()
    lastName: string

    @Column({
        unique: true
    })
    @AutoMap()
    username: string

    @Column({
        unique: true
    })
    @AutoMap()
    email: string

    @Column()
    @AutoMap()
    position: string

    @Column()
    @AutoMap()
    salary: number

    @CreateDateColumn()
    @AutoMap(() => Date)
    startDate: Date

    @Column({
        nullable: true
    })
    @AutoMap(() => Date)
    endDate: Date

    @Column()
    @AutoMap()
    password:string;

    @ManyToOne(() => Team)
    @JoinColumn({
        name: "team_id"
    })
    @AutoMap(() => Team)
    team: Team

}
