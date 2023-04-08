import {  Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany} from "typeorm";
import { Employees } from "./Employees";
import { Companies } from "./Companies";

@Entity()
export class Teams extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    company_id:number

    @Column()
    name:string

    @Column()
    department:number

    @Column()
    description:string

    @OneToMany(()=>Employees, (employee) =>employee.team_id)
    employee:Employees

    @ManyToOne(()=>Companies,(company)=>company.id)
    company:Companies
}