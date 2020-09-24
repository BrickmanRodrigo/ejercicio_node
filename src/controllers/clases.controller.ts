import { Request, Response } from "express";
import { Clase } from "../models/clase.model";
import { Profesor } from "../models/profesor.model";
import { StandardController } from "./standard.controller";
import { ModelStatic } from "../config/modelStatic.type";

export class ClasesController extends StandardController {
    public staticModel : ModelStatic = Clase;

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