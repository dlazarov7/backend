import * as express from "express";
import { TeamService } from "../services/TeamService";
import  TeamDto  from "../dtos/TeamDto";

export class TeamControler{
    router: express.Router;

    constructor(){
        this.router=express.Router();
        this.initializeRoutes()
    }
    private initializeRoutes(){
        this.router.get("/getAllTeams",this.getAllTeams)
    }

    getAllTeams= async (req:express.Request,res:express.Response)=>{
        try {
            const teams=await TeamService.getInstance().getAllTeams();
            res.status(200).send(teams);
        } catch (error) {
            res.send(error);
        }
    }
}