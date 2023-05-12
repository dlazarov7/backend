import * as express from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { CompanyControler } from "../controllers/CompanyControler";
import { TeamControler } from "../controllers/TeamControler";
import { LoginControler } from "../controllers/LoginControler";
class MainRouter {

    router: express.Router;
    employeeController:EmployeeController;
    companyControler:CompanyControler;
    teamControler:TeamControler;
    loginControler:LoginControler;

    constructor() {
        this.router = express.Router();
        this.employeeController=new EmployeeController();
        this.companyControler= new CompanyControler();
        this.teamControler= new TeamControler();
        this.loginControler=new LoginControler();
        this.registerRoutes();
    }


    registerRoutes() {
        this.router.use(this.employeeController.router);
        this.router.use(this.companyControler.router);
        this.router.use(this.teamControler.router);
        this.router.use(this.loginControler.router);
    }
}
export { MainRouter }