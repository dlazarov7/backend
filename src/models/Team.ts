import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Employee } from "./Employee";
import { Company } from "./Company";

@Entity({ name: "teams" })
export class Team extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: "company_id"
    })
    companyId: number

    @Column()
    name: string

    @Column()
    department: string

    @Column()
    description: string

    @OneToMany(() => Employee, (employee) => employee.teamId)
    employees: Employee[];

    @ManyToOne(() => Company, (company) => company.id)
    @JoinColumn({
        name: "company_id"
    })
    company: Company;
}