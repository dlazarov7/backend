import { AppDataSource } from "../data-source";
import { Employee } from "../models/Employee";
import bcrypt from 'bcrypt';
import { mapper } from "../utilities/mapper/AutoMapper";
import EmployeeDto from "../dtos/EmployeeDto";
import EmployeeRegisterDto from "../dtos/EmployeeRegisterDto";
import { createMap } from "@automapper/core";

export class LoginService {

    private static instance: LoginService;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LoginService();
            createMap(mapper, EmployeeRegisterDto, Employee);
            createMap(mapper, EmployeeDto, Employee);
            createMap(mapper, Employee, EmployeeDto);
        }
        return this.instance;
    }

    async userAuthentication(userData: EmployeeRegisterDto) {

        //const user=mapper.map(userData,EmployeeRegisterDto,Employee);

        const result = await AppDataSource
            .getRepository(Employee)
            .createQueryBuilder("emp")
            .where('emp.email=:email', { email: userData.email })
            .getOne();

        if (!result) {
            return "User Not Found";
        }
        
        return bcrypt.compareSync(userData.password, result.password) ?
            mapper.map(result, Employee, EmployeeDto)
            : "Wrong password";

    }

    async isUserLogedgout() {

        return "Successfuly logedout";
    }
}