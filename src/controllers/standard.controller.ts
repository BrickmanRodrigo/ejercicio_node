import { Request, Response } from "express";
import { DestroyOptions } from "sequelize/types";
import { ModelStatic } from "../config/modelStatic.type";

export abstract class StandardController {
    public abstract staticModel: ModelStatic;

    getAll = (req: Request, res: Response) => {
        this.staticModel.findAll()
            .then((clases) => res.json(clases))
            .catch((err: Error) => res.status(500).json(err));
    }

    findById = (req: Request, res: Response) => {
        const id: string = req.params.id;

        this.staticModel.findByPk(id)
            .then((result) => {
                if (result) {
                    res.json(result);
                } else {
                    res.status(404).json({ errors: ["Not found"] });
                }
            })
    }

    delete = (req: Request, res: Response) => {
        const id: string = req.params.id;
        const options: DestroyOptions = {
            where: { id: id },
            limit: 1,
        };

        this.staticModel.destroy(options)
            .then(() => res.status(204).json({ data: "Success" }))
            .catch((err: Error) => res.status(500).json(err));
    }



    create = <T>(req: Request, res: Response) => {
        const params: T = req.body;

        this.staticModel.create(params)
            .then((response) => { res.status(201).json(response) })
            .catch((err: Error) => res.status(500).json(err));
    }


}