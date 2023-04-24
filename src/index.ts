import { AppDataSource } from "./data-source";
import express, { Request, Response, NextFunction, json } from "express";
import bodyParser from "body-parser";
import { MainRouter } from "./router/MainRouter";
import promiseRouter from "express-promise-router";
import log4js from "log4js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(json());

app.get('/', (req: Request, res: Response) => {
    res.send("guzzzdfvsd00");
})


AppDataSource.initialize().then(async () => {

    const router = promiseRouter();
    const setUpRouter = new MainRouter(); //inicializirame
    const mainRouter = setUpRouter.router;
    router.use(mainRouter);
    app.use(router);
    const logger = log4js.getLogger("test");
    logger.level = "debug";

}).catch(error => console.log(error));

app.listen(4000, () => {

    console.log('server is listening on port 4000');
});

export { }