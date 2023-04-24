import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Employee } from "./Employee";
import { Company } from "./Company";
import { AutoMap } from "@automapper/classes";

@Entity({ name: "teams" })
export class Team extends BaseEntity {

    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number

    @Column({
        name: "company_id"
    })
    @AutoMap()
    companyId: number

    @Column()
    @AutoMap()
    name: string

    @Column()
    @AutoMap()
    department: string

    @Column()
    @AutoMap()
    description: string

    @OneToMany(() => Employee, (employee) => employee.teamId)
    employees: Employee[];

    @ManyToOne(() => Company, (company) => company.id)
    @JoinColumn({
        name: "company_id"
    })
    @AutoMap(()=>Company)
    company: Company;
}