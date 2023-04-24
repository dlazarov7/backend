import { AutoMap } from "@automapper/classes";

export default class CompanyDto{
    @AutoMap()
    id:number;

    @AutoMap()
    name:string;

    @AutoMap()
    country:string;
}