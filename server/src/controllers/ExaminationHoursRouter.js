const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');


router.post('/add', (req, res) => {
    const {slotTime, currentDate, idStaff} = req.body;
    
    let query = `insert into examination_hours(slotTime, currentDate, active) values('${slotTime}', '${currentDate}', 1)`; 
                 
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        return res.status(200).json({success: true, message: "Add success"});
    })
})

router.patch('/edit', (req, res) => {
    const {idTime, slotTime, currentDate} = req.body;
    let query = `select idTime, slotTime, currentDate from examination_hours where idTime = ${idTime}`;

    connection.query(query, (err, result) => {
 
        if(err) return res.status(400).json({success: false, message: "Erorr"});
 
        let slotTimeOld = result[0].slotTime;
        let currentDateOld = result[0].currentDate;

        

        let slotTimes, currentDates;


        if(slotTime === '') {slotTimes = slotTimeOld} else {slotTimes = slotTime}
        if(currentDate === '') {currentDates = currentDateOld} else {currentDates = currentDate}

        
        let query1 = `update examination_hours set slotTime = '${slotTimes}', currentDate = ${currentDates} where idTime = ${idTime}`;
        connection.query(query1, (err, result1) => {
            if(err) return res.status(400).json({success: false, message: "Erorr1"});
            return res.status(200).json({success: true, message: "Edit success" });
        })
    })
})

router.delete('/delete', (req, res) => {
    let idTime = req.body.idTime;
    let query = `update examination_hours set active = 0 where idTime = ${idTime}`;

    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"})
        return res.status(200).json({success: true, message: "Delete success"})
    })
})

router.get('/getAll', (req, res) => {
    let query = `select * from examination_hours where active = 1`;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        return res.status(200).json({success: true, message: "Get all time success", result})
    })
})

router.post('/getSingle', (req, res) => {
    const idTime = req.body.idTime;
    let query = `select * from examination_hours where idTime = ${idTime} and active = 1`;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr"});
        return res.status(200).json({success: true, message: "Get slot time success", result})
    })
})



module.exports = router;