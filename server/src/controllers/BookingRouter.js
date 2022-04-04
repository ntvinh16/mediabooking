const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
// const { checkvaluesBooking, checkvaluesTime, checkvaluesStatus } = require('./middleware/booking_middleware');
const middleware = require('./middleware/booking_middleware');

const arrMiddleware = [middleware.checkvaluesPatient, middleware.checkvaluesSpecialist,
middleware.checkvaluesStaff, middleware.checkvaluesStatus, middleware.checkvaluesTime];





router.post('/add', arrMiddleware, (req, res) => {

     const { idTime, idStaff, idStatus, idPatient, date, idSpecialist } = req.body;

     let queryCheckStaff = `select idTime, idPatient from booking where idStaff = ${idStaff} and active = 1`;
     connection.query(queryCheckStaff, (err, resultCheckStaff) => {
          if (err) return res.status(400).json({ success: false, message: "Erorr" });
          var checkTimeStaff = true;
          for (let i = 0; i < resultCheckStaff.length; i++) {
               if (idTime === resultCheckStaff[i].idTime.toString()) {
                    checkTimeStaff = false;
                    break;
               }
          }
          if (checkTimeStaff) {
               let queryChekPatient = `select idTime, idStaff from booking where idPatient = ${idPatient}`;
               connection.query(queryChekPatient, (err, resultCheckPatient) => {
                    if (err) return res.status(400).json({ success: false, message: "Erorr check patient" })
                    var checkTimePatient = true;
                    for (let i = 0; i < resultCheckPatient.length; i++) {
                         if (idTime === resultCheckPatient[i].idTime.toString()) {
                              checkTimePatient = false;
                              break;
                         }
                    }
                    if (checkTimePatient) {
                         let query = `insert into booking(idTime, idStaff, idStatus, idPatient, date, idSpecialist, active)
                         values(${idTime}, ${idStaff}, ${idStatus}, ${idPatient}, '${date}', ${idSpecialist}, 1)`;
                         connection.query(query, (err, result) => {
                              if (err) return res.status(400).json({ success: false, message: "Erorr add booking" });

                              let queryUpdateDoctorTime = `update doctor_time set active = 0 where idTime = ${idTime}`;
                              connection.query(queryUpdateDoctorTime, (err, resultUDT) => {
                                   if (err) return res.status(400).json({ success: false, message: "Erorr update time" })
                                   return res.status(200).json({ success: true, message: "Booking success" });
                              })
                         })

                    }
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
          if (err) return res.status(400).json({ success: false, message: "Erorr" })
          return res.status(200).json({ success: true, message: "Delete success" })
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
