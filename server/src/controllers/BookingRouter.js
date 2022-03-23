const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
const { checkvaluesBooking, checkvaluesTime, checkvaluesStatus } = require('./middleware/booking_middleware');
const middleware = require('./middleware/booking_middleware');

const arrMiddleware = [middleware.checkvaluesPatient, middleware.checkvaluesSpecialist,
middleware.checkvaluesStaff, middleware.checkvaluesStatus, middleware.checkvaluesTime];





router.post('/add', arrMiddleware, (req, res) => {

     const { idTime, idStaff, idStatus, idPatient, date, idSpecialist } = req.body;

     let query = `insert into booking(idTime, idStaff, idStatus, idPatient, date, idSpecialist)
                  values(${idTime}, ${idStaff}, ${idStatus}, ${idPatient}, '${date}', ${idSpecialist})`;
     connection.query(query, (err, result) => {
          if (err) return res.status(400).json({ success: false, message: "Erorr add booking" });
          return res.status(200).json({ success: true, message: "Add booking success" });
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

router.post('/edit', (req, res) => {
     const {idBooking, idTime, idStatus } = req.body;
     
     let query = `select idTime, idStatus from booking where idBooking = ${idBooking}`;
     connection.query(query, (err, result) => {
          if (err) return res.status(400).json({ success: false, message: "Erorr" });
          if (result.length === 0) return res.status(200).json({ success: true, message: "Values booking empty!!!" })
          let oldIdTime = result[0].idTime;
          let oldIdStatus = result[0].idStatus;

          let idTimes, idStatuss;

          if(idTime === '') {idTimes = oldIdTime} else {idTimes = idTime};
          if(idStatus === '') {idStatuss = oldIdStatus} else {idStatuss = idStatus};

          let query1 = `update booking set idTime = ${idTimes}, idStatus = ${idStatuss} where idBooking = ${idBooking}`;

          connection.query(query1, (err1, result1) => {
               if(err1) return res.status(400).json({success: false, message: "Erorr1 not edit booking"});
               return res.status(200).json({success: true, message: "Edit booking success", idTimes, idStatuss});
          })

     })
})




module.exports = router
