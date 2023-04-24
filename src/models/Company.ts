import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity({ name: "companies" })
export class Company extends BaseEntity {

    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number

    @Column({
        unique: true
    })
    @AutoMap()
    name: string

    @Column()
    @AutoMap()
    country: string

}