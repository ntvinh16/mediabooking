const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
// const { checkvaluesBooking, checkvaluesTime, checkvaluesStatus } = require('./middleware/booking_middleware');
// const middleware = require('./middleware/booking_middleware');

// const arrMiddleware = [middleware.checkvaluesPatient, middleware.checkvaluesSpecialist,
// middleware.checkvaluesStaff, middleware.checkvaluesStatus, middleware.checkvaluesTime];





router.post('/add', (req, res) => {

     const { idTime, idStaff, idStatus, idPatient, date, idSpecialist, idPayment } = req.body;

     let queryCheck = `select idTime, date, idPatient from booking where idStaff = ${idStaff} and idPatient = ${idPatient} and active = 1`;
     connection.query(queryCheck, (err, resultCheck) => {
          if (err) return res.status(400).json({ success: false, message: "Erorr check " });
          // return res.status(200).json({success: true, message: "ok", resultCheck})
          var checkDate = true;

          for (let i = 0; i < resultCheck.length; i++) {
               if (date === resultCheck[i].date) {
                    console.log(resultCheck[i].date)
                    checkDate = false;
                    break;
               }
          }

          if (checkDate) {
               // let queryDoctorTime = `select date as dateDoctorTime from doctor_time where idStaff = ${idStaff} and active = 1  group by date`
               // connection.query(queryDoctorTime, (err, resultDoctorTime) => {
               //      if (err) return res.status(400).json({ success: false, message: "erer" })
               //      var checkDateDoctorTime = false;

               //      for (let i = 0; i < resultDoctorTime.length; i++) {
               //           if (date === resultDoctorTime[i].dateDoctorTime) {
               //                // console.log(resultDoctorTime[i].dateDoctorTime)
               //                checkDateDoctorTime = true;
               //                break;
               //           }
               //      }
               //      if (checkDateDoctorTime) {

               //      } else return res.status(200).json({ success: true, message: "okok", resultDoctorTime })
               //      // console.log(checkDateDoctorTime)
               // })
               let queryUpdateDoctorTime = `update doctor_time set active = 0 where idStaff = ${idStaff} and idTime = ${idTime} and date = '${date}'`;
               connection.query(queryUpdateDoctorTime, (err, resultUDT) => {
                    if (err) return res.status(400).json({ success: false, message: "Erorr update time", err })

                    let query = `insert into booking(idTime, idStaff, idStatus, idPatient, date, idSpecialist, idPayment, paymentStatus, active)
                              values(${idTime}, ${idStaff}, ${idStatus}, ${idPatient}, '${date}', ${idSpecialist}, ${idPayment}, 1, 1)`;
                    connection.query(query, (err, result) => {
                         if (err) return res.status(400).json({ success: false, message: "Erorr add booking" });
                         return res.status(200).json({ success: true, message: "Booking success" });
                    })
               })

          } else {
               var checkTime = false;
               for (let i = 0; i < resultCheck.length; i++) {
                    if (idTime === resultCheck[i].idTime.toString()) {
                         checkTime = true;
                         break;
                    }
               }
               // console.log(checkTime);
               if (checkTime) {

               }
          }




          // if (checkDateStaff) {
          //      var checkTimeStaff = true;
          //      for (let i = 0; i < resultCheckStaff.length; i++) {
          //           if (idTime === resultCheckStaff[i].idTime.toString()) {
          //                checkTimeStaff = false;
          //                break;
          //           }
          //      }
          //      console.log(checkTimeStaff)
          //      if (checkTimeStaff) {
          //           let queryChekPatient = `select idTime, idStaff from booking where idPatient = ${idPatient}`;
          //           connection.query(queryChekPatient, (err, resultCheckPatient) => {
          //                if (err) return res.status(400).json({ success: false, message: "Erorr check patient" })

          //                var checkStaffPatient = true;
          //                for (let i = 0; i < resultCheckPatient.length; i++) {
          //                     if (idTime === resultCheckPatient[i].idStaff.toString()) {
          //                          checkStaffPatient = false;
          //                          break;
          //                     }
          //                }

          //                if (checkStaffPatient) {

          //                     var checkTimePatient = true;
          //                     for (let i = 0; i < resultCheckPatient.length; i++) {
          //                          if (idTime === resultCheckPatient[i].idTime.toString()) {
          //                               checkTimePatient = false;
          //                               break;
          //                          }
          //                     }
          //                     if (checkTimePatient) {
          //                          let query = `insert into booking(idTime, idStaff, idStatus, idPatient, date, idSpecialist, idPayment, paymentStatus, active)
          //                         values(${idTime}, ${idStaff}, ${idStatus}, ${idPatient}, '${date}', ${idSpecialist}, ${idPayment}, 1, 1)`;
          //                          connection.query(query, (err, result) => {
          //                               if (err) return res.status(400).json({ success: false, message: "Erorr add booking" });

          //                               let queryUpdateDoctorTime = `update doctor_time set active = 0 where idStaff = ${idStaff} and idTime = ${idTime}`;
          //                               connection.query(queryUpdateDoctorTime, (err, resultUDT) => {
          //                                    if (err) return res.status(400).json({ success: false, message: "Erorr update time" })
          //                                    return res.status(200).json({ success: true, message: "Booking success" });
          //                               })
          //                          })

          //                     } return res.status(200).json({ success: true, message: "Patient has an appointment" })
          //                }
          //                else {
          //                     let query = `insert into booking(idTime, idStaff, idStatus, idPatient, date, idSpecialist, idPayment, paymentStatus, active)
          //                         values(${idTime}, ${idStaff}, ${idStatus}, ${idPatient}, '${date}', ${idSpecialist}, ${idPayment}, 1, 1)`;
          //                     connection.query(query, (err, result) => {
          //                          if (err) return res.status(400).json({ success: false, message: "Erorr add booking" });

          //                          let queryUpdateDoctorTime = `update doctor_time set active = 0 where idPatient = ${idPatient} and idTime = ${idTime}`;
          //                          connection.query(queryUpdateDoctorTime, (err, resultUDT) => {
          //                               if (err) return res.status(400).json({ success: false, message: "Erorr update time" })
          //                               return res.status(200).json({ success: true, message: "Booking success" });
          //                          })
          //                     })
          //                }
          //           })

          //      } else return res.status(200).json({ success: true, message: "Time reverved" })

          // } else {
          //      let query = `insert into booking(idTime, idStaff, idStatus, idPatient, date, idSpecialist, idPayment, paymentStatus, active)
          //                    values(${idTime}, ${idStaff}, ${idStatus}, ${idPatient}, '${date}', ${idSpecialist}, ${idPayment}, 1, 1)`;
          //      connection.query(query, (err, result) => {
          //           if (err) return res.status(400).json({ success: false, message: "Erorr add booking" });

          //           let queryUpdateDoctorTime = `update doctor_time set active = 0 where idStaff = ${idStaff} and idTime = ${idTime}`;
          //           connection.query(queryUpdateDoctorTime, (err, resultUDT) => {
          //                if (err) return res.status(400).json({ success: false, message: "Erorr update time" })
          //                return res.status(200).json({ success: true, message: "Booking success" });
          //           })
          //      })
          // }

     })
})

router.get('/getAll', (req, res) => {
     let query = `select da from booking`;

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


router.get('/getAllExaminationSchedule', (req, res) => {
     let query = `select booking.idBooking, examination_hours.slotTime, booking.date, patient.name as namePatient, staff.name as nameDoctor, status.statusName, booking.active
                 from booking, examination_hours, patient, doctor_info, status, staff, doctor_time
                 where booking.idTime = doctor_time.idTime and booking.idPatient = patient.idPatient and
                 booking.idStaff = doctor_info.idStaff and booking.idStatus = status.idStatus and doctor_info.idStaff = staff.idStaff
                 and doctor_time.idTime = examination_hours.idTime group by booking.idBooking`
     connection.query(query, (err, result) => {

          if (err) return res.status(400).json({ success: false, message: "Erorr get examination schedule success" })
          return res.status(200).json({ success: true, message: "Get examination schedule success", result })
     })
})

router.get('/getAllExaminationScheduleInPatient', (req, res) => {
     const idPatient = req.body.idPatient;
     let query = `select booking.idBooking, examination_hours.slotTime, booking.date, patient.name as namePatient, staff.name as nameDoctor, status.statusName, booking.active
                 from booking, examination_hours, patient, doctor_info, status, staff, doctor_time
                 where booking.idTime = doctor_time.idTime and booking.idPatient = patient.idPatient and
                 booking.idStaff = doctor_info.idStaff and booking.idStatus = status.idStatus and doctor_info.idStaff = staff.idStaff
                 and doctor_time.idTime = examination_hours.idTime and booking.idPatient = ${idPatient} group by booking.idBooking`
     connection.query(query, (err, result) => {
          console.log(err)
          if (err) return res.status(400).json({ success: false, message: "Erorr get examination schedule success" })
          return res.status(200).json({ success: true, message: "Get examination schedule success", result })
     })
})


router.get('/getAllTimeInDoctor', (req, res) => {
     const idStaff = req.body.idStaff
     let query = `select patient.name, examination_hours.slotTime, booking.date from booking, examination_hours, patient, doctor_time
                 where booking.idTime = doctor_time.idTime and doctor_time.idTime = examination_hours.idTime
                 and patient.idPatient = booking.idPatient and booking.idStatus = 1 and booking.idStaff = ${idStaff} group by idBooking`;
     connection.query(query, (err, result) => {
          if (err) return res.status(400).json({ success: false, message: "Erorr get all time doctor", err })
          return res.status(200).json({ success: true, message: "Get all time doctor success", result });
     })
})





module.exports = router
