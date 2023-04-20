import { AppDataSource } from "../data-source";
import { Employee } from "../entity/Employee";


export class EmployeeService {

    private static instance: EmployeeService;
    constructor() { };
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmployeeService();
        }
        return this.instance;
    }

    async departmentAvgSalary(depName: string) {
        const depAvgSal = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("emps")
            .innerJoin('emps.team', 'team')
            .select(`team.department`)
            .addSelect('AVG(emps.salary) AS avg_salary')
            .where("department=:name", { name: depName })
            .groupBy('team.department')
            .getRawMany()
        return depAvgSal;

    }

    async editEmployee(employeeId: number, managerId: number, teamId: number, firstName: string, lastName: string, username: string, email: string, position: string, salary: number) {
        const toEdit = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder()
            .update()
            .set({
                manager_id: managerId,
                team_id: teamId,
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                position: position,
                salary: salary,
            })
            .where("id=:id", { id: employeeId })
            .execute()
        return toEdit;
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

    async addEmployee(managerId: number, teamId: number, firstName: string, lastName: string, username: string, email: string, position: string, salary: number) {
        const emp = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder('emp')
            .insert()
            .into(Employee)
            .values({
                manager_id: managerId,
                team_id: teamId,
                first_name: firstName,
                last_name: lastName,
                username: username,
                email: email,
                position: position,
                salary: salary,
                startDate: () => "CURRENT_DATE"
            })
            .execute()
        return emp;
    }

    async expInCompany(companyName: string) {
        const exp = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder('emps')
            .innerJoinAndSelect('emps.team', 'team')
            .innerJoinAndSelect('team.company', 'company')
            .select('COUNT("company_id") as emp_count')
            .addSelect(`STRING_AGG("first_name"||' '||"last_name", ', ') AS "workers"`)
            .where(`(( DATE_PART('year', CURRENT_DATE) - DATE_PART('year', "startDate")) * 12 + (DATE_PART('month', CURRENT_DATE) - DATE_PART('month', "startDate")))>=6`)
            .andWhere(`company.name=:name`, { name: companyName })
            .getRawOne();

        return exp;
    }

    async avgSalary() {
        const avg = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("emps")
            .innerJoin('emps.team', 'team')
            .select(`team.department`)
            .addSelect('AVG(emps.salary) AS avg_salary')
            .groupBy('team.department')
            .getRawMany()

        return avg;

    }

    async teamInfo(teamName: string) {
        const team = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("emps")
            .innerJoin("emps.team", 'team')
            .select(`team.name, STRING_AGG("first_name"||' '||"last_name"||' '||'id: '||emps.id, ', ') AS "team_mates"`)
            .addSelect('"manager_id"')
            .where('team.name=:name', { name: teamName })
            .groupBy("team.name")
            .addGroupBy("manager_id")
            .getRawMany()

        return team
    }

    async filterEmployees() {
        const filteredEmployees = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("emps")
            .innerJoinAndSelect('emps.team', 'team')
            .innerJoinAndSelect('team.company', 'company')
            .select(`STRING_AGG(emps.first_name||' '||emps.last_name, ', ') AS "workers"`)
            .addSelect('"country"')
            .where(`(date_part('year', current_date) - date_part('year', emps.startDate))>10`)
            .andWhere(`company.country='Bulgaria'`)
            .groupBy(`company.country`)
            .getRawMany()

        return filteredEmployees;
    }

    async getAllEmployees() {
        const employees = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("employee")
            .getMany();

        return employees;
    }

    async getEmployeeById(employeeId: number) {
        const employee = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("emp")
            .where('emp.id=:id', { id: employeeId })
            .getOne();
        return employee;
    }
}