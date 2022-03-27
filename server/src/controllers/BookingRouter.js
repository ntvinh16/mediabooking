const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
// const { checkvaluesBooking, checkvaluesTime, checkvaluesStatus } = require('./middleware/booking_middleware');
const middleware = require('./middleware/booking_middleware');

const arrMiddleware = [middleware.checkvaluesPatient, middleware.checkvaluesSpecialist,
middleware.checkvaluesStaff, middleware.checkvaluesStatus, middleware.checkvaluesTime];





router.post('/add', arrMiddleware, (req, res) => {

     const { idTime, idStaff, idStatus, idPatient, date, idSpecialist } = req.body;

     let queryCheck = `select idTime, idPatient from booking where idStaff = ${idStaff}`;
     connection.query(queryCheck, (err, resultCheck) => {
          if (err) return res.status(400).json({ success: false, message: "Erorr" });
          var checkTime = true;
          var checkPatient = true;
          for (let i = 0; i < resultCheck.length; i++) {
               if (idTime === resultCheck[i].idTime.toString()) {
                    checkTime = false;
                    break;
               }
          }          
          for (let i = 0; i < resultCheck.length; i++) {
               if (idPatient === resultCheck[i].idPatient.toString()) {
                    checkPatient = false;
                    break;
               }
          }

          if (checkTime && checkPatient) {
               let query = `insert into booking(idTime, idStaff, idStatus, idPatient, date, idSpecialist, active)
               values(${idTime}, ${idStaff}, ${idStatus}, ${idPatient}, '${date}', ${idSpecialist}, 1)`;
               connection.query(query, (err, result) => {
                    if (err) return res.status(400).json({ success: false, message: "Erorr add booking" });
                    return res.status(200).json({ success: true, message: "Add booking success" });
               })
          } else return res.status(200).json({ success: true, message: "Time reverved" })

     })


})
router.get('/getAll', (req, res) => {
     let query = `select * from booking`;

     connection.query(query, (err, result) => {
          if (err) return res.status(400).json({ success: false, message: "Erorr get all booking" });
          return res.status(200).json({ success: true, message: "Get all booking success", result });
     })
})

router.post('/getSingle', (req, res) => {
     const idBooking = req.body.idBooking;
     let query = `select * from booking where idBooking = ${idBooking}`;

     connection.query(query, (err, result) => {
          if (err) return res.status(200).json({ success: false, message: "Erorr get single booking" });
          return res.status(200).json({ success: true, message: "Get single booking success", result });
     })
})

router.delete('/delete', (req, res) => {
     const idBooking = req.body.idBooking;
     let query = `update booking set active = 0 where idBooking = ${idBooking}`;

     connection.query(query, (err, result) => {
         if(err) return res.status(400).json({success: false, message: "Erorr"})
         return res.status(200).json({success: true, message: "Delete success"})
     })
})


router.post('/getDoctorTime', (req, res) => {
     const idStaff = req.body.idStaff;
     let query = `select idTime from booking where idStaff = ${idStaff}`;

     connection.query(query, (err, result) => {
          if (err) return res.status(200).json({ success: false, message: "Erorr get time doctor" });
          return res.status(200).json({ success: true, message: "Get time doctor success", result });
     })
})




module.exports = router
