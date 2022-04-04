const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
const bcrypt = require('bcrypt');


// Login for Staff (email, password)

router.post('/staff', (req, res) => {
    const { email, password } = req.body;

    if (email === '') return res.status(200).json({ success: false, message: "email empty" });
    if (password === '') return res.status(200).json({ success: false, message: "password empty" });


    let query = `select * from staff where email='${email}' and active = 1 `;


    connection.query(query, (err, result) => {

        if (err) return res.status(400).json({ success: false, message: "fail" });

        if (result.length > 0) {
            let query1 = `select password from staff where email='${email}'`;
            connection.query(query1, async (errs, results) => {

                if (errs) return res.status(400).json({ success: false, message: "fail1" });

                if (results.length > 0) {

                    const condition = await bcrypt.compareSync(password, results[0].password);
                    if (condition) return res.status(200).json({ success: true, message: "login success", result });
                    return res.status(200).json({ success: true, message: "password false" });
                } else {
                    return res.status(200).json({ success: true, message: "password empty" });
                }
            })
        } else {
            return res.status(200).json({ success: true, message: "email invalid" });

        }
    })


})

//Login for Admin

module.exports = router;