import {  Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Employee } from "./Employee";
import { Company } from "./Company";

@Entity({name:"teams"})
export class Team extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    company_id:number

    @Column()
    name:string

    @Column()
    department:string

    @Column()
    description:string

    @OneToMany(()=>Employee, (employee) =>employee.team_id)
    employee:Employee

    @ManyToOne(()=>Company,(company)=>company.id)
    @JoinColumn({
        name:"company_id"
    })
    company:Company
}