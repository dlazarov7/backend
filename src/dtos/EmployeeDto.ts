import TeamDto from "./TeamDto";

export default class EmployeeDto {
    id: number;
    managerId: number;
    teamId: number;
    firstName: string;
    lastName: string;
    fullName: string;
    username: string;
    email: string;
    salary: number;
    startDate: string;
    endDate: string;
    team:TeamDto;
}