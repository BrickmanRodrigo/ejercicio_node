import { Request, Response } from "express";
import { Clase } from "../models/clase.model";
import { DestroyOptions } from "sequelize";
import { Alumno } from "../models/alumno.model";

export interface AlumnoInterface {
    nombre: string;
    edad: number;
    clase_id: number[];
}

export class AlumnosController {

    public getAll(req: Request, res: Response) {
        Alumno.findAll()
            .then((alumnos: Array<Alumno>) => res.json(alumnos))
            .catch((err: Error) => res.status(500).json(err));
    }

    public create(req: Request, res: Response) {
        const params: AlumnoInterface = req.body;

        Alumno.create(params)
            .then((alumno: Alumno) => {
                return alumno.setClases(params.clase_id)
                    .then(response => res.status(201).json(response))
            })
            .catch((err: Error) => res.status(500).json(err));
    }

    public findById(req: Request, res: Response) {
        const alumnoId: string = req.params.id;

        Alumno.findByPk(alumnoId)
            .then((alumno: Alumno | null) => {
                if (alumno) {
                    res.json(alumno);
                } else {
                    res.status(404).json({ errors: ["Alumno not found"] });
                }
            })
    }

    public delete(req: Request, res: Response) {
        const alumnoId: string = req.params.id;
        const options: DestroyOptions = {
            where: { id: alumnoId },
            limit: 1,
        };

        Alumno.destroy(options)
            .then(() => res.status(204).json({ data: "Success" }))
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