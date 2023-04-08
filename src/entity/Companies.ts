import {  Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
//import { Teams } from "./Teams";

@Entity()
export class Companies extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number

    @Column({
        unique:true
    })
    name:string

    @Column()
    country:string

}