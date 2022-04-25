const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
const { checkvaluesStaff } = require('./middleware/booking_middleware');
const middleware = require('./middleware/info_middleware')


router.post('/add', checkvaluesStaff, (req, res) => {
    const {idStaff, idSpecialist, contentHTML, contentMarkdown} = req.body;

    let query = `insert into doctor_info(idStaff, idSpecialist, contentHTML, contentMarkdown)
                 values(${idStaff}, ${idSpecialist}, '${contentHTML}', '${contentMarkdown}')
                 ON DUPLICATE KEY UPDATE idSpecialist = ${idSpecialist}, 
                 contentHTML = '${contentHTML}', contentMarkdown = '${contentMarkdown}'`;
    connection.query(query, (err, result) => {
       
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        return res.status(200).json({success: true, message: "Add success", idStaff, idSpecialist, contentHTML, contentMarkdown});
    })
})

router.get('/getAllDoctor', (req, res) => {
    let query = `select idStaff, name from staff where idRole = 2`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        return res.status(200).json({success: true, message: "Get all doctor success", result});
    })
})

router.post('/getDoctor',checkvaluesStaff, (req, res) => {
    const idStaff = req.body.idStaff;
    let query = `select * from staff, doctor_info where staff.idStaff = doctor_info.idStaff and doctor_info.idStaff = ${idStaff}`
    
    connection.query(query, async (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"})
        return res.status(200).json({success: true, message: "Get doctor success", result});
       
    })

    
})

router.post('/getDoctorSpecialist', (req, res) => {
    const idSpecialist = req.body.idSpecialist;
    let query = `select * from staff, doctor_info where staff.idStaff= doctor_info.idStaff and idSpecialist = ${idSpecialist}`
    connection.query(query, async (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"})
        return res.status(200).json({success: true, message: "Get specialist success", result});
    })
})

router.get('/getAllSpecialist', (req, res) => {
    let query = `select idSpecialist, departmentName from Specialist`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        return res.status(200).json({success: true, message: "Get all specialist success", result});
    })
})












module.exports = router;