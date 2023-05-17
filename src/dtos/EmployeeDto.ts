import { AutoMap } from "@automapper/classes";
import TeamDto from "./TeamDto";

export default class EmployeeDto {
    @AutoMap()
    id: number;

    @AutoMap()
    managerId: number;

    @AutoMap()
    teamId: number;

    @AutoMap()
    firstName: string;

    @AutoMap()
    lastName: string;

    fullName?: string;

    @AutoMap()
    username: string;

    @AutoMap()
    email: string;

    @AutoMap()
    salary: number;

    @AutoMap()
    position:string;

    @AutoMap(()=>Date)
    startDate: string;

    @AutoMap(()=>Date)
    endDate: string;

    
    @AutoMap(()=>TeamDto)
    team:TeamDto;
}