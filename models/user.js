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
    },
    token:{
        type: DataTypes.STRING
    },
    resetToken:{
        type: DataTypes.STRING
    },
    resetTokenExpires:{
        type: DataTypes.DATE
    }
    
});

export default User;
