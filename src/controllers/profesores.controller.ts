import { Request, Response } from "express";
import { Alumno } from "../models/alumno.model";
import { Clase } from "../models/clase.model";
import { DestroyOptions } from "sequelize";
import { Profesor } from "../models/profesor.model";
import sequelize = require("sequelize");
import { StandardController } from "./standard.controller";
import { ModelStatic } from "../config/modelStatic.type";

export class ProfesoresController extends StandardController {
    public staticModel : ModelStatic = Profesor;

    public getStatisticsByProfe(req: Request, res: Response) {
        Profesor.findAll({
            attributes: [
                ["id", "profe_id"],
                [sequelize.fn("COUNT",
                    sequelize.fn("DISTINCT",
                        sequelize.col("Clases->Alumnos.id")
                    )
                ), "total_alumnos"]
            ],
            // Los attributes : [] se ponen para que no agregue los campos al SELECT y no explote por el count/groupBy
            include: {
                model: Clase, attributes: [], include: [
                    { model: Alumno, attributes: [], through: { attributes: [] } }
                ]
            },
            group: "profe_id",
            order: [[sequelize.literal("total_alumnos"),"DESC"]]
        })
            .then((result) => res.status(201).json(result))
            .catch((err: Error) => res.status(500).json(err));
    }
}