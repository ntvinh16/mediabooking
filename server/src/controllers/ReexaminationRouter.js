const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');


router.post('/add', (req, res) => {
    const {idBooking, idTime, date, description} = req.body;

    let query = `insert into re_examination(idBooking, idTime, date, description, active) values (${idBooking}, ${idTime}, '${date}', '${description}', 1)`;
    connection.query(query, (err, result) => {
        
        if(err) return res.status(400).json({success: false, message: "Erorr add re_examination"})
        return res.status(200).json({success: true, message: "Add re_examination success"});
    })
})

router.post('/getSingle', (req, res) => {
    const idRe_examination = req.body.idRe_examination;

    let query = `select * from booking, re_examination where booking.idBooking = re_examination.idBooking and idRe_examination=${idRe_examination}`;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: true, message: "Erorr get re_examination"})
        return res.status(200).json({success: true, message: "Get re_examination", result})
    }) 
})



module.exports = router