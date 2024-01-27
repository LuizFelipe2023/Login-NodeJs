import { DataTypes } from "sequelize";
import conn from "../database_connection/conexao.js";

const User = conn.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false, 
        required: true, 
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true 
    }
});

export default User;
