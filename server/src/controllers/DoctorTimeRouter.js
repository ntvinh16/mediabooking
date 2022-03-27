const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');


router.post('/add', (req, res) => {
    const { idStaff, idTime, date } = req.body;

    let queryCheck = `select idTime from doctor_time where idStaff = ${idStaff}`
    connection.query(queryCheck, (err, resultCheck) => {
        if (err) return res.status(400).json({ success: false, message: "Erorr check" });

        var check = true
        for (let i = 0; i < resultCheck.length; i++) {
            if (resultCheck[i].idTime.toString() === idTime) {
                check = false;
                break;
            }
        }
        if (check) {
            let query = `insert into doctor_time(idStaff, idTime, date) values (${idStaff}, ${idTime}, '${date}')`;
            connection.query(query, (err, result) => {
                if (err) return res.status(200).json({ success: false, message: "Erorr add not time" });
                return res.status(200).json({ success: true, message: "Add time success" });
            })
        } else return res.status(200).json({ success: true, message: "Time reverved" })


    })

})

router.get('/getAllTime', (req, res) => {
    const idStaff = req.query.idStaff;

    let query = `select * from doctor_time where idStaff = ${idStaff}`;
    connection.query(query, (err, result) => {
        if(err) return res.status(400).json({success: false, message: "Erorr get all time doctor"})
        return res.status(200).json({success: true, message: "Get all time doctor success", result});
    })
})




module.exports = router;