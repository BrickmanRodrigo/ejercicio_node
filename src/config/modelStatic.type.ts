import { BuildOptions, Model } from "sequelize/types";

export type ModelStatic = typeof Model & (new(values?: object, options?: BuildOptions) => Model);