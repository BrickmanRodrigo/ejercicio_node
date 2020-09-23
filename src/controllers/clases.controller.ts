import { Request, Response } from "express";
import { Clase } from "../models/clase.model";
import { UpdateOptions, DestroyOptions } from "sequelize";
import { Profesor } from "../models/profesor.model";
import { Alumno } from "../models/alumno.model";

export interface ClaseInterface {   
    nombre : string;
    horario : string;
    profesorId: string;
}

export class ClasesController {
    

    public getAll(req: Request, res: Response) {
        Clase.findAll<Clase>({include:Alumno})
            .then((clases: Array<Clase>) => res.json(clases))
            .catch((err: Error) => res.status(500).json(err));
    }

    public create(req: Request, res: Response) {
        const params: ClaseInterface = req.body;

        Clase.create<Clase>(params)
            .then((clase: Clase) => res.status(201).json(clase))
            .catch((err: Error) => res.status(500).json(err));
    }
}