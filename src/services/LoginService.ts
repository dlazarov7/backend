import { AppDataSource } from "../data-source";
import { Employee } from "../models/Employee";

export class LoginService {

    private static instance: LoginService;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LoginService();
        }
        return this.instance;
    }

    async userAuthentication(email:string,password:string){
        const result=await AppDataSource
        .getRepository(Employee)
        .createQueryBuilder("emp")
        .select(`emp.first_name, emp.last_name`)
        .where('emp.email=:email',{email: email})
        .andWhere('emp.password=:password',{password:password})
        .getRawOne()
        
        return result;
    }

    async isUserLogedgout (){
        
        return "Successfuly logedout";
    }
}