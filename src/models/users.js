const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const { uuid } = require('uuidv4');
const User = sequelize.define('users', {
    UID: {
        type: DataTypes.STRING, 
        primaryKey: true,
        defaultValue: uuid
    }, 
    Username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    Full_Name: {
        type: DataTypes.STRING
    },
    Email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    }, 
    Password: {
        type: DataTypes.STRING
    },
    Created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = User;