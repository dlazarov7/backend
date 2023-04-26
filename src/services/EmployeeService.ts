import { AppDataSource } from "../data-source";
import { Employee } from "../models/Employee";
import { Team } from "../models/Team";
import { mapper } from "../utilities/mapper/AutoMapper";
import { createMap, forMember, mapFrom } from "@automapper/core";
import EmployeeDto from "../dtos/EmployeeDto";
import TeamDto from "../dtos/TeamDto";
import CompanyDto from "../dtos/CompanyDto";
import { Company } from "../models/Company";
import moment from "moment";
import AvgSalaryDto from "../dtos/AvgSalaryDto";
import CustomMapper from "../utilities/mapper/CustomMapper";

export class EmployeeService {

    private static instance: EmployeeService;
    constructor() { };
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmployeeService();
            createMap(mapper, EmployeeDto, Employee,
                forMember(
                    dest => dest.startDate,
                    mapFrom(src => new Date(src.startDate))
                ),
                forMember(
                    dest => dest.endDate,
                    mapFrom(src => src.endDate ? new Date(src.endDate) : null)
                ),
                forMember(
                    destination => destination.team,
                    mapFrom(src => mapper.map(src.team, TeamDto, Team))
                )

            );
            createMap(mapper, Employee, EmployeeDto,
                forMember(
                    destination => destination.fullName,
                    mapFrom(source => `${source.firstName} ${source.lastName}`)
                ),
                forMember(
                    destination => destination.startDate,
                    mapFrom(src => moment(src.startDate).format("DD/MM/YYYY"))
                ),
                forMember(
                    destination => destination.endDate,
                    mapFrom(src => src.endDate ? moment(src.endDate).format("DD/MM/YYYY") : null)
                ),
                forMember(
                    destination => destination.team,
                    mapFrom(src => mapper.map(src.team, Team, TeamDto))
                )


            );
            createMap(mapper, TeamDto, Team, forMember(
                destination => destination.company,
                mapFrom(src => mapper.map(src.company, Company, CompanyDto))
            ));
            createMap(mapper, Team, TeamDto);
            createMap(mapper, CompanyDto, Company);
            createMap(mapper, Company, CompanyDto);

        }
        return this.instance;
    }

    async departmentAvgSalary(depName: string) {
        const depAvgSal = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("emps")
            .innerJoin('emps.team', 'team')
            .select(`team.department AS department`)
            .addSelect('AVG(emps.salary) AS avgSalary')
            .where("department=:name", { name: depName })
            .groupBy('team.department')
            .getRawOne()
            
           let avgSal=(CustomMapper.mapAvgSalaryToAvgSalaryDto(depAvgSal));
            return avgSal;

    }

    async editEmployee(empDto: EmployeeDto) {
        const emp = mapper.map(empDto, EmployeeDto, Employee);
        emp.startDate = new Date();

        const toEdit = await AppDataSource
            .getRepository(Employee)
            .save(emp)


        return mapper.map(emp, Employee, EmployeeDto);
    }

    async deleteEmployee(employeeId: number) {
        const toDelete = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder()
            .delete()
            .from(Employee)
            .where("id=:id", { id: employeeId })
            .execute()
        return toDelete;
    }

    async addEmployee(empDto: EmployeeDto) {
        const emp = mapper.map(empDto, EmployeeDto, Employee);
        emp.startDate = new Date();

        const newEmp = await AppDataSource
            .getRepository(Employee)
            .save(emp)
        return mapper.map(newEmp, Employee, EmployeeDto);
    }

    async expInCompany(companyName: string) {
        const exp = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder('emps')
            .innerJoinAndSelect('emps.team', 'team')
            .innerJoinAndSelect('team.company', 'company')
            // .select("emps.id")
            // .addSelect("emps.manager_id")
            // .addSelect(`concat(emps.first_name||' '||emps.last_name) AS fullName`)
            .where(`(( DATE_PART('year', CURRENT_DATE) - DATE_PART('year', "startDate")) * 12 + (DATE_PART('month', CURRENT_DATE) - DATE_PART('month', "startDate")))>=6 `)
            .andWhere(`company.name=:name`, { name: companyName })
            // .groupBy(`fullName`)
            // .addGroupBy("emps.id")
            .getMany();

        return exp.map(emp => mapper.map(emp, Employee, EmployeeDto));
    }

    async avgSalary() {
        const avg = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("emps")
            .innerJoinAndSelect('emps.team', 'team')
            .select(`team.department as department`)
            .addSelect('AVG(emps.salary) AS avgSalary')
            .groupBy('team.department')
            .getRawMany();

        let dtoAvgSalArr:Array<AvgSalaryDto>=[];
         avg.forEach(dep=>dtoAvgSalArr.push(CustomMapper.mapAvgSalaryToAvgSalaryDto(dep)));
         return dtoAvgSalArr;

    }

    async teamInfo(teamName: string) {
        const team = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("emps")
            .innerJoin("emps.team", 'team')
            // .select(`team.name`)
            // //.addSelect(`concat("first_name"||' '||"last_name") AS "fullName"`)
            // .addSelect(`emps.id`)
            // .addSelect('"manager_id"')
            .where('team.name=:name', { name: teamName })
            // .groupBy("team.name")
            // .addGroupBy(`emps.id`)
            // //.addGroupBy(`"fullName"`)
            // .addGroupBy("manager_id")
            .getMany()

        return team.map(emp => mapper.map(emp, Employee, EmployeeDto))
    }

    async filterEmployees(country: string, years: number) {
        const filteredEmployees = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("employee")
            .innerJoinAndSelect('employee.team', 'team')
            .innerJoinAndSelect('team.company', 'company')
            .where(`(date_part('year', current_date) - date_part('year', employee.startDate))>:years`, { years: years })
            .andWhere(`company.country=:country`, { country: country })
            .getMany()


        // let empDtos = [];

        // filteredEmployees.forEach(emp => {
        //     let dto = CustomMapper.mapEmployeeToEmployeeDto(emp);
        //     empDtos.push(dto);
        // });
        return filteredEmployees.map(emp => mapper.map(emp, Employee, EmployeeDto));
    }

    async getAllEmployees() {
        const employees = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("employee")
            .innerJoinAndSelect("employee.team", "team")
            .leftJoinAndSelect("team.company", "company")
            .getMany();

        // let employeeDtos = [];
        // employees.forEach(emp => {
        //     let dto = CustomMapper.mapEmployeeToEmployeeDto(emp);
        //     employeeDtos.push(dto);
        // })
        return employees.map(emp => mapper.map(emp, Employee, EmployeeDto));
    }

    async getEmployeeById(employeeId: number) {
        const employee = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("emp")
            .where('emp.id=:id', { id: employeeId })
            .getOne();

        return mapper.map(employee, Employee, EmployeeDto);
    }
}