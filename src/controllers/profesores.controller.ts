import { Request, Response } from "express";
import { Alumno } from "../models/alumno.model";
import { Clase } from "../models/clase.model";
import { DestroyOptions } from "sequelize";
import { Profesor } from "../models/profesor.model";
import sequelize = require("sequelize");

export interface ProfesorInterface {
    nombre: string;
    edad: number;
    matricula: string;
}

export class ProfesoresController {

    public getAll(req: Request, res: Response) {
        Profesor.findAll()
            .then((profesores: Array<Profesor>) => res.json(profesores))
            .catch((err: Error) => res.status(500).json(err));
    }

    public create(req: Request, res: Response) {
        const params: ProfesorInterface = req.body;

        Profesor.create(params)
            .then((profesor: Profesor) => res.status(201).json(profesor))
            .catch((err: Error) => res.status(500).json(err));
    }

    public findById(req: Request, res: Response) {
        const profesorId: string = req.params.id;

        Profesor.findByPk(profesorId)
            .then((profesor: Profesor | null) => {
                if (profesor) {
                    res.json(profesor);
                } else {
                    res.status(404).json({ errors: ["Profesor not found"] });
                }
            })
    }

    public delete(req: Request, res: Response) {
        const profesorId: string = req.params.id;
        const options: DestroyOptions = {
            where: { id: profesorId },
            limit: 1
        };

        Profesor.destroy(options)
            .then(() => res.status(204).json({ data: "Success" }))
            .catch((err: Error) => res.status(500).json(err));
    }

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