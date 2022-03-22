const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');

router.post('/add', (req, res) => {
        const {idTime, idStaff, idStatus, idPatient, date, idSpecialist} = req.body;

        let query = `select idTime, slotTime, currentDate, active from examination_hours where idTime = ${idTime} and active = 1`;
        let query1 = `select idStaff, staffName, idRole, active from staff where idStaff = ${idStaff} and idRole = 2 and active = 1`;
        let query2 = `select idStatus, statusName, active from status where idStatus = ${idStatus} and active = 1`;
        let query3 = `select idPatient, patientName, active from patient where idPatient = ${idPatient} and active = 1`;
        let query4 = `select idSpecialist, specialitsName, active from specialist where idSpecialist = ${idSpecialist} and active = 1`;

        connection.query(query, (err, result) => {
            if(err) return res.status(400).json({success: false, message: "Erorr"});
            return res.status(200).json({success: true, message: "Success", result});
        });
        // connection.query(query1, (err, result1) => {
        //     if(err) return res.status(400).json({success: false, message: "Erorr1"});
        //     return res.status(200).json({success: true, message: "Success", result1});
        // });
        // connection.query(query2, (err, result2) => {
        //     if(err) return res.status(400).json({success: false, message: "Erorr2"});
        //     return res.status(200).json({success: true, message: "Success", result2});
        // });
        // connection.query(query3, (err, result3) => {
        //     if(err) return res.status(400).json({success: false, message: "Erorr3"});
        //     return res.status(200).json({success: true, message: "Success", result3});
        // });
        // connection.query(query4, (err, result4) => {
        //     if(err) return res.status(400).json({success: false, message: "Erorr4"});
        //     return res.status(200).json({success: true, message: "Success", result4});
        // });



})




module.exports = router