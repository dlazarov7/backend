import { AutoMap } from "@automapper/classes";
import CompanyDto from "./CompanyDto";

export default class TeamDto{
    @AutoMap()
    id:number;

    @AutoMap()
    companyId:number;

    @AutoMap()
    name:string;

    @AutoMap()
    department:string;

    @AutoMap()
    description:string;

    // @AutoMap(()=>EmployeeDto)
    // employees:EmployeeDto[];

    @AutoMap(()=>CompanyDto)
    company:CompanyDto;
}