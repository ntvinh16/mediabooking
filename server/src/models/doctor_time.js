'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Time extends Model {
       
        static associate(models) {

        }
    }
    Doctor_Time.init({
        idStaff: DataTypes.INTEGER,
        idTime: DataTypes.INTEGER,
        date: DataTypes.STRING,
        active: DataTypes.INTEGER
    },
     {
        sequelize,
        modelName: 'Doctor_Time',
    });
    return Doctor_Time;
};

