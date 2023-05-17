import { AutoMap } from "@automapper/classes";
 export default class EmployeeRegister{

    @AutoMap()
    firstName: string;

    @AutoMap()
    lastName: string;

    @AutoMap()
    username: string;

    @AutoMap()
    email: string;

    @AutoMap()
    password:string;
 }
