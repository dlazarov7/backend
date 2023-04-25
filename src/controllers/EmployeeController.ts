import * as express from "express";
import { EmployeeService } from "../services/EmployeeService"
import EmployeeDto from "../dtos/EmployeeDto";

export class EmployeeController {

    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get("/filter/employees", this.filterEmployees);
        this.router.get('/team/info', this.teamInfo);
        this.router.get("/avg/salary", this.avgSalary);
        this.router.get('/employees/company', this.expInCompany);
        this.router.get("/getAllEmployees", this.getAllEmployees);
        this.router.get("/getEmployeeById", this.getEmployeeById);
        this.router.post("/employee/add", this.addEmployee);
        this.router.delete("/employee/delete", this.deleteEmployee);
        this.router.put("/employee/edit", this.editEmployee);
        this.router.get("/department/avg/salary", this.departmentAvgSalary);
    }

    departmentAvgSalary = async (req: express.Request, res: express.Response) => {
        try {
            const avgSal = await EmployeeService.getInstance().departmentAvgSalary(String(req.query.depName));
            res.status(200).send(avgSal);
        } catch (error) {
            res.send(error);
        }
    }

    editEmployee = async (req: express.Request, res: express.Response) => {
        try {
            const empDto= req.body as EmployeeDto;
            const emp = await EmployeeService.getInstance().editEmployee(empDto);
            res.status(200).send(empDto);
        } catch (error) {
            res.send(error);
        }
    }

    deleteEmployee = async (req: express.Request, res: express.Response) => {
        try {
            const emp = await EmployeeService.getInstance().deleteEmployee(Number(req.body.employeeId));
            res.status(200).send("Successfully deleted employee");
        } catch (error) {
            res.send(error);
        }
    }

    addEmployee = async (req: express.Request, res: express.Response) => {
        try {
            
            const empDto=req.body as EmployeeDto;
            const emp = await EmployeeService.getInstance().addEmployee(empDto);
            res.status(200).send(emp);
        } catch (error) {
            res.send(error);
        }
    }

    expInCompany = async (req: express.Request, res: express.Response) => {
        try {
            const exp = await EmployeeService.getInstance().expInCompany(String(req.query.name));
            res.status(200).send(exp);
        } catch (error) {
            res.send(error);
        }
    }

    avgSalary = async (req: express.Request, res: express.Response) => {
        try {
            const avgSaalry = await EmployeeService.getInstance().avgSalary()
            res.status(200).send(avgSaalry);
        } catch (error) {
            res.send(error);
        }
    }

    teamInfo = async (req: express.Request, res: express.Response) => {
        try {
            const team = await EmployeeService.getInstance().teamInfo(String(req.query.name))
            res.status(200).send(team);
        } catch (error) {
            res.send(error);
        }
    }

    filterEmployees = async (req: express.Request, res: express.Response) => {
        try {
            const {country, years}=req.query;
            const filteredEmployees = await EmployeeService.getInstance().filterEmployees(String(country),Number(years));
            res.status(200).send(filteredEmployees);
        } catch (error) {
            res.send(error);
        }
    }

    getAllEmployees = async (req: express.Request, res: express.Response) => {
        try {
            const employees = await EmployeeService.getInstance().getAllEmployees();
            res.status(200).send(employees);

        } catch (error) {
            res.send(error);
        }
    }
    getEmployeeById = async (req: express.Request, res: express.Response) => {
        try {
            const employeeId = Number(req.query.id);

            const employee = await EmployeeService.getInstance().getEmployeeById(employeeId);
            res.status(200).send(employee);

        } catch (error) {
            res.send(error);
        }
    }
}