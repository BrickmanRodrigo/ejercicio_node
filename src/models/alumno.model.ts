import { Model, DataTypes, BelongsToManyGetAssociationsMixin, BelongsToManySetAssociationsMixin, BelongsToManyAddAssociationsMixin } from "sequelize";
import { database } from "../config/database";
import { Clase } from "./clase.model";

export interface AlumnoInterface {
    nombre: string;
    edad: number;
    clase_id: number[];
}

export class Alumno extends Model {
    public id!: number;
    public nombre!: string;
    public edad!: number;
    public Clases? : Clase[];
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getClases!: BelongsToManyGetAssociationsMixin<Clase>;
    public setClases!: BelongsToManySetAssociationsMixin<Clase,number>;
}

Alumno.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        edad: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
    },
    {
        tableName: "Alumno",
        sequelize: database,
    }
);

Alumno.belongsToMany(Clase, {
    through: "Clase_Alumno",
    foreignKey: "clase_id"
})

// Se declara esta relacion aca porque Alumno no esta instanciado todavia en clases.model.ts
Clase.belongsToMany(Alumno, {
    through: "Clase_Alumno",
    foreignKey: "alumno_id"
})

// Alumno.sync({ force: true }).then(() => console.log("Alumno table created"));

