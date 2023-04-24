import CompanyDto from "./CompanyDto";
import EmployeeDto from "./EmployeeDto";

export default class TeamDto{
    id:number;
    companyId:number;
    name:string;
    department:string;
    description:string;
    employees:EmployeeDto[];
    company:CompanyDto;
}