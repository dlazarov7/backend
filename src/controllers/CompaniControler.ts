import * as express from "express";
import { CompanyService } from "../services/CompanyService";
import exp from "constants";
export class CompanyControler {

    router: express.Router;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes()
    }
    private initializeRoutes() {
        this.router.get("/allCompanies", this.getAllCompanies);
        this.router.get("/getCompanyByid", this.getCompanyById);
        this.router.post("/addCompany", this.addCompany);
        this.router.put("/editCompany", this.editCompany);
        this.router.delete("/company/delete",this.deleteCompany);
    }

    deleteCompany = async (req: express.Request, res: express.Response) => {
        try {
            const editedCompany = await CompanyService.getInstance().deleteCompany(String(req.body.companyName));
            res.status(200).send('Successfully deleted company');
        } catch (error) {
            res.send(error);
        }
    }

    editCompany = async (req: express.Request, res: express.Response) => {
        try {
            const {  newName, newCountry } = req.body;
            const companyId = parseInt(req.body.companyId);
            const editedCompany = await CompanyService.getInstance().editCompany(companyId,String(newName), String(newCountry));
            res.status(200).send("Successfully edited company");
        } catch (error) {
            res.send(error);
        }
    }

    addCompany = async (req: express.Request, res: express.Response) => {
        try {
            const { companyName, countryName } = req.body;
            const company = await CompanyService.getInstance().addCompany(String(companyName), String(countryName));
            res.status(200).send("Successfully added company");
        } catch (error) {
            res.send(error);
        }
    }

    getCompanyById = async (req: express.Request, res: express.Response) => {
        try {
            const company = await CompanyService.getInstance().getCompanyById(Number(req.query.id));
            res.status(200).send(company);
        } catch (error) {
            res.send(error);
        }
    }

    getAllCompanies = async (req: express.Request, res: express.Response) => {
        try {
            const companies = await CompanyService.getInstance().getAllCompanies();
            res.status(200).send(companies);
        } catch (error) {
            res.send(error);
        }
    }

}