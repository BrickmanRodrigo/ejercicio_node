import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import { Routes } from "./config/routes";
import { database } from "./config/database";

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        database.sync().then(() => {
            console.log("SYNC COMPLETE")
            this.routePrv.routes(this.app);
        })
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;