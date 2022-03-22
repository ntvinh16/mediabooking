'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Info extends Model {
       
        static associate(models) {

        }
    }
    Doctor_Info.init({
        idStaff: DataTypes.INTEGER,
        idSpecialist: DataTypes.INTEGER,
        level: DataTypes.STRING,
        contentHTML: DataTypes.TEXT,
        contentMarkdown: DataTypes.TEXT,
        description: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Doctor_Info',
    });
    return Doctor_Info;
};

