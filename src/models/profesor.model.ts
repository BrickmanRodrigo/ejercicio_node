import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export interface ProfesorInterface {
    nombre: string;
    edad: number;
    matricula: string;
}

export class Profesor extends Model {
  public id!: number;
  public nombre!: string;
  public edad! : number;
  public matricula! : string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Profesor.init(
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
      matricula: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: "Profesor",
      sequelize: database,
    }
  );
  
//   Profesor.sync({ force: true }).then(() => console.log("Profesor table created"));