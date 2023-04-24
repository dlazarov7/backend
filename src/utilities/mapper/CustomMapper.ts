import EmployeeDto from "../../dtos/EmployeeDto";
import TeamDto from "../../dtos/TeamDto";
import { Employee } from "../../models/Employee";
import moment from "moment";
import { Team } from "../../models/Team";
import { Company } from "../../models/Company";
import CompanyDto from "../../dtos/CompanyDto";

export default class CustomMapper {
    static mapEmployeeToEmployeeDto(employee: Employee) {
        const employeeDto = new EmployeeDto();

        employeeDto.id = employee.id;
        employeeDto.managerId = employee.managerId;
        employeeDto.teamId = employee.teamId;
        employeeDto.firstName = employee.firstName;
        employeeDto.lastName = employee.lastName;
        employeeDto.fullName = `${employee.firstName} ${employee.lastName}`;
        employeeDto.username = employee.username;
        employeeDto.email = employee.email;
        employeeDto.salary = employee.salary;
        employeeDto.startDate = moment(employee.startDate).format("DD/MM/YYYY");
        employeeDto.endDate = employee.endDate ? moment(employee.endDate).format("DD/MM/YYYY") : null;
        employeeDto.team = this.mapTeamToTeamDto(employee.team);
        return employeeDto;
    }

    static mapEmployeeDtoToEmployee(employeeDto: EmployeeDto) {
        const employee = new Employee();

        employee.id = employeeDto.id;
        employee.managerId = employeeDto.managerId;
        employee.teamId = employeeDto.teamId;
        employee.firstName = employeeDto.firstName;
        employee.lastName = employeeDto.lastName;
        employee.username = employeeDto.username;
        employee.email = employeeDto.email;
        employee.salary = employeeDto.salary;
        employee.startDate = new Date(employeeDto.startDate);

        employee.endDate = employeeDto.endDate ? new Date(employeeDto.endDate) : null;

        employee.team = this.mapTeamDtoToTeam(employeeDto.team);
        return employee;
    }

    static mapTeamToTeamDto(team: Team) {
        const teamDto = new TeamDto();

        teamDto.id = team.id;
        teamDto.companyId = team.companyId;
        teamDto.name = team.name;
        teamDto.department = team.department;
        teamDto.description = team.description;
        teamDto.employees = team.employees.map(emp=>this.mapEmployeeToEmployeeDto(emp));
        teamDto.company = this.mapCompanyToCompanyDto(team.company);

        return teamDto
    }

    static mapTeamDtoToTeam(teamDto: TeamDto) {
        const team = new Team();
        team.id = teamDto.id;
        team.companyId = teamDto.companyId;
        team.name = teamDto.name;
        team.department = teamDto.department;
        team.description = teamDto.description;
        team.employees = teamDto.employees.map(emp=>this.mapEmployeeDtoToEmployee(emp));
        team.company = this.mapCompanyDtoToCmpany(teamDto.company);

        return team;
    }

    static mapCompanyToCompanyDto(company: Company) {

        const companyDto = new CompanyDto();
        companyDto.id = company.id;
        companyDto.name = company.name;
        companyDto.country = company.country;
        return companyDto;
    }

    static mapCompanyDtoToCmpany(companyDto: CompanyDto) {
        const company = new Company();
        company.id = companyDto.id;
        company.name = companyDto.name;
        company.country = companyDto.country;
        return company
    }
}