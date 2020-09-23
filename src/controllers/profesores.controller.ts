import { Request, Response } from "express";
import { UpdateOptions, DestroyOptions } from "sequelize";
import { Profesor } from "../models/profesor.model";

export interface ProfesorInterface {   
    nombre : string;
    edad : number;
    matricula : string;
}

export class ProfesoresController {

    public getAll(req: Request, res: Response) {
        Profesor.findAll<Profesor>({})
            .then((profesores: Array<Profesor>) => res.json(profesores))
            .catch((err: Error) => res.status(500).json(err));
    }

    public create(req: Request, res: Response) {
        const params: ProfesorInterface = req.body;

        Profesor.create<Profesor>(params)
            .then((profesor: Profesor) => res.status(201).json(profesor))
            .catch((err: Error) => res.status(500).json(err));
    }
}