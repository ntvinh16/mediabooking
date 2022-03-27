const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');


router.post('/add', (req, res) => {
    const {idBooking, description} = req.body;
    console.log(idBooking, description)
    let query = `insert into history(idBooking, description) values (${idBooking}, '${description}')`;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr add history"})
        return res.status(200).json({success: true, message: "Add history success"});
    })
})


router.get('/getSingle', (req, res) => {
    const idHistory = req.body.idHistory;

    let query = `select * from booking, history where booking.idBooking = history.idBooking and idHistory = ${idHistory}`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr get history"})
        return res.status(200).json({success: true, message: "Get history success", result});
    })
})

router.get('/getAll', (req, res) => {
    let query = `select * from booking, history where booking.idBooking = history.idBooking`;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr get all history"});
        return res.status(200).json({success: true, message: "Get all history success", result});
    })
})



module.exports = router;