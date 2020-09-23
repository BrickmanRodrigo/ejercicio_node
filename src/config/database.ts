import { Sequelize } from "sequelize";

export const database = new Sequelize("mydb","root","password123",{
    host: "localhost",
    dialect: "mysql",
});