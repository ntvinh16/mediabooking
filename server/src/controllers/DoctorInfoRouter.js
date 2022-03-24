const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');


router.post('/add', (req, res) => {
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

router.post('/getDoctor', (req, res) => {
    const idStaff = req.body.idStaff;
    let query = `select idStaff from staff where idStaff = ${idStaff} and idRole = 2`
    
    connection.query(query, async (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"})
        return res.status(200).json({success: true, message: "Get doctor success", result});
       
    })

    
})

router.post('/getSpecialist', (req, res) => {
    const idSpecialist = req.body.idSpecialist;
    let query = `select idSpecialist, departmentName from specialist where idSpecialist = ${idSpecialist}`
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



// router.post('/getAllTime', (req, res) => {
//     const idStaff = req.body.idStaff;
//     let query1 = `select id`
//     let query = `select * from examination_hours where idStaff = ${idStaff} `;

//     connection.query(query, (err, result) => {
//         if(err) return res.status(400).json({success: false, message: "Erorr"});
//         return res.status(200).json({success: true, message: "Get all time success", result});
//     })
// })








module.exports = router;