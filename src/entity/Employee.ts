import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm"
import { Teams } from "./Team";


@Entity()
export class Employees extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    manager_id: number

    @Column({
       // foreignKeyConstraintName:"team_id"
    })
    team_id:number
    
    @Column()
    first_name: string

    @Column()
    last_name: string

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

    @ManyToOne(()=> Teams,(team) =>team.id)
    @JoinColumn({
        name:"team_id"
    })
    team: Teams

}
