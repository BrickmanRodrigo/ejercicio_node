import { Request, Response } from "express";
import { DestroyOptions } from "sequelize";
import { Clase } from "../models/clase.model";
import { Alumno } from "../models/alumno.model";
import { Profesor } from "../models/profesor.model";

export interface ClaseInterface {
    nombre: string;
    horario: string;
    profesor_id: string;
}

export class ClasesController {


    public getAll(req: Request, res: Response) {
        Clase.findAll()
            .then((clases: Array<Clase>) => res.json(clases))
            .catch((err: Error) => res.status(500).json(err));
    }

    public create(req: Request, res: Response) {
        const params: ClaseInterface = req.body;

        Clase.create(params)
            .then((clase: Clase) => res.status(201).json(clase))
            .catch((err: Error) => res.status(500).json(err));
    }

    public findById(req: Request, res: Response) {
        const claseId: string = req.params.id;

        Clase.findByPk(claseId)
            .then((clase: Clase | null) => {
                if (clase) {
                    res.json(clase);
                } else {
                    res.status(404).json({ errors: ["Clase not found"] });
                }
            })
    }

    public delete(req: Request, res: Response) {
        const claseId: string = req.params.id;
        const options: DestroyOptions = {
            where: { id: claseId },
            limit: 1
        };

        Clase.destroy(options)
            .then(() => res.status(204).json({ data: "Success" }))
            .catch((err: Error) => res.status(500).json(err));
    }

    public findProfeById(req: Request, res: Response) {
        const claseId: string = req.params.id;

        Profesor.findOne({ include: { model: Clase, where: { id: claseId }, attributes: []} })
            .then((profesor: Profesor | null) => {
                if (profesor) {
                    res.json(profesor);
                } else {
                    res.status(404).json({ errors: ["Profesor not found"] });
                }
            })
            .catch((err: Error) => res.status(500).json(err));
    }
}