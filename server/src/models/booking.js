'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
   
            
        }
    }
    Booking.init({
        idTime: DataTypes.INTEGER,
        idStaff: DataTypes.INTEGER,
        idStatus: DataTypes.INTEGER,
        idPatient: DataTypes.INTEGER,
        date: DataTypes.STRING,
        idSpecialist: DataTypes.INTEGER,
        idPayment: DataTypes.INTEGER,
        paymentStatus: DataTypes.INTEGER,
        active: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};

