
const express = require('express')
const nodemailer = require('nodemailer')
import bodyParser from "body-parser";




// const { VNPay } = require('vn-payments');

const staffRouter = require('./controllers/StaffRouter')
const loginRouter = require('./controllers/LoginRouter')
const patientRouter = require('./controllers/PatientRouter')
const roleRouter = require('./controllers/RoleRouter')
const specialistRouter = require('./controllers/SpecialistRouter')
const doctorinfoRouter = require('./controllers/DoctorInfoRouter');
const examinationHoursRouter = require('./controllers/ExaminationHoursRouter');
const statusRouter = require('./controllers/StatusRouter');
const paymentRouter = require('./controllers/PaymentRouter');
const bookingRouter = require('./controllers/BookingRouter')
const doctorTimeRouter = require('./controllers/DoctorTimeRouter')
const historyRouter = require('./controllers/HistoryRouter')
const emailRouter = require('./controllers/EmailRouter')





// import cors from 'cors';
let app = express();


// let nodemailer = nodemailer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) // use req.body


require('dotenv').config();

app.use('/api/login', loginRouter)
app.use('/api/staff', staffRouter)
app.use('/api/patient', patientRouter)
app.use('/api/role', roleRouter)
app.use('/api/specialist', specialistRouter)
app.use('/api/doctorinfo', doctorinfoRouter)
app.use('/api/examinationhours', examinationHoursRouter)
app.use('/api/status', statusRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/doctorTime', doctorTimeRouter)
app.use('/api/history', historyRouter)
app.use('/api/email', emailRouter)






let port = process.env.PORT || 6969;
// Port === undefined => port = 6969
app.listen(port, () => {
    console.log("Backend Nodejs is runing on the port: " + port);
})