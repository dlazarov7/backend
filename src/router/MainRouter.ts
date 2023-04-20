import * as express from "express";
import { EmployeeController } from "../controllers/EmployeeController";
import { CompanyControler } from "../controllers/CompaniControler";
class MainRouter {

    router: express.Router;
    employeeController:EmployeeController;
    companyControler:CompanyControler;

    constructor() {
        this.router = express.Router();
        this.employeeController=new EmployeeController();
        this.companyControler= new CompanyControler();
        this.registerRoutes();
    }


    registerRoutes() {
        this.router.use(this.employeeController.router);
        this.router.use(this.companyControler.router)
    }
}
export { MainRouter }