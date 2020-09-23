import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
import { Profesor } from "./profesor.model";
import { Alumno } from "./alumno.model";

export class Clase extends Model {
  public id!: number;
  public nombre!: string;
  public horario! : string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Clase.init(
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
      horario: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      tableName: "Clase",
      sequelize: database,
    }
  );

  Clase.belongsTo(Profesor,{
      foreignKey: "profesor_id"
  })
  
//   Clase.sync({ force: true }).then(() => console.log("Clase table created"));