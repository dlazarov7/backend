import * as express from "express";
import { LoginService } from "../services/LoginService";
import { stringify } from "querystring";

export class LoginControler{
    router:express.Router;

    constructor(){
        this.router=express.Router();
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post("/login",this.userAuthentication);
        this.router.post("/logout",this.isUserLogedgout);
    }

    userAuthentication= async (req:express.Request,res:express.Response)=>{
        try {
            const responce = await LoginService.getInstance().userAuthentication(String(req.body.email),String(req.body.password));
            if (responce) {
                res.status(200).send(responce)
            }else(
                res.status(404).send('User not found')
            )
        } catch (error) {
            res.send(error);
        }
     }

     isUserLogedgout = async (req:express.Request,res:express.Response)=>{
        try {
            const isLogedout = await LoginService.getInstance().isUserLogedgout();
            if (isLogedout) {
                res.status(200).send(isLogedout);
            }else(
                res.status(404).send('User not logedout')
            )
        } catch (error) {
            res.send(error);
        }

     }
}