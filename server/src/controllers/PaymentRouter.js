const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');


router.post('/add', (req, res) => {
    const methodName = req.body.methodName;
    let query = `insert into payment(methodName) values('${methodName}')`
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Add payment erorr"})
        return res.status(200).json({success: true, message: "Add payment success"})
    })
})

router.get('/getAllPayment', (req, res) => {
    let query = `select methodName from payment`
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Get all methodName erorr"})
        return res.status(200).json({success: true, message: "Get all method success"})
    })
})

module.exports = router;