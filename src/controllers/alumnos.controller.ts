import { Request, Response } from "express";
import { Clase } from "../models/clase.model";
import { DestroyOptions, Model } from "sequelize";
import { Alumno, AlumnoInterface } from "../models/alumno.model";
import { StandardController } from "./standard.controller";
import { ModelStatic } from "../config/modelStatic.type";


export class AlumnosController extends StandardController {
    public staticModel: ModelStatic = Alumno;

    // Override
    create = (req: Request, res: Response) => {
        const params: AlumnoInterface = req.body;

        Alumno.create(params)
            .then((alumno: Alumno) => {
                return alumno.setClases(params.clase_id)
                    .then(response => res.status(201).json(response))
            })
            .catch((err: Error) => res.status(500).json(err));
    }

    public findClasesById(req: Request, res: Response) {
        const alumnoId: string = req.params.id;

        // {trough: {attributes: []}} es para que no incluya la tabla intermedia del belongsToMany
        Alumno.findByPk(alumnoId, { include: { model: Clase, through: { attributes: [] } }, })
            .then((alumno: Alumno | null) => {
                if (alumno) {
                    res.json(alumno.Clases);
                } else {
                    res.status(404).json({ errors: ["Alumno not found"] });
                }
            })
            .catch((err: Error) => res.status(500).json(err));
    }
}