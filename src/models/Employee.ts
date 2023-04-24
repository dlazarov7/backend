import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Team } from "./Team";


@Entity({ name: "employees" })
export class Employee extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: "manager_id"
    })
    managerId: number

    @Column({
        name: "team_id"
    })
    teamId: number

    @Column({
        name: "first_name"
    })
    firstName: string

    @Column({
        name: "last_name"
    })
    lastName: string

    @Column({
        unique: true
    })
    username: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    position: string

    @Column()
    salary: number

    @CreateDateColumn()
    startDate: Date

    @Column({
        nullable: true
    })
    endDate: Date

    @ManyToOne(() => Team)
    @JoinColumn({
        name: "team_id"
    })
    team: Team

}
