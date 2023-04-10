import { AppDataSource } from "./data-source";
import { Employees } from "./entity/Employee";
import { Companies } from "./entity/Company";
import { Teams } from "./entity/Team";

import express, { Request, Response, NextFunction, json } from "express";
import bodyParser from "body-parser";


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(json());

app.get('/', (req: Request, res: Response) => {
    res.send("guzzzdfvsd00");
})

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const company = new Companies();
    //const employee = new Employees();
    company.country = "Bulgaria";
    company.name = "nashata firma";

    // employee.first_name = "Rostislav";
    // employee.last_name = "Mitev";
    // employee.manager_id = 2;
    // employee.email="rostimit@gmail.com";
    // employee.position="Dev";
    // employee.salary=3000;
    // employee.username="rostimit";
    // employee.team_id=1;
    // employee.startDate = Date();
    await AppDataSource.manager.save(company);
    console.log("Saved a new user with id: " + company.id);

    console.log("Loading users from the database...");
    const companies = await AppDataSource.manager.find(Companies);
    console.log("Loaded users: ", company);

    console.log("Here you can setup and run express / fastify / any other framework.");

}).catch(error => console.log(error));

app.listen(4000, ()=> {
    
    console.log('server is listening on port 4000');
});

export { }