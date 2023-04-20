import {  Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity({name:"companies"})
export class Company extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column({
        unique:true
    })
    name:string

    @Column()
    country:string

}