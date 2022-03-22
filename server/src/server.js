
const express = require('express')
import bodyParser from "body-parser";
const staffRouter = require('./controllers/StaffRouter')
const loginRouter = require('./controllers/LoginRouter')
const patientRouter = require('./controllers/PatientRouter')
const roleRouter = require('./controllers/RoleRouter')
const specialistRouter = require('./controllers/SpecialistRouter')
const doctorinfoRouter = require('./controllers/DoctorInfoRouter');
const examinationHoursRouter = require('./controllers/ExaminationHoursRouter');
const statusRouter = require('./controllers/StatusRouter');
const reExaminationRouter = require('./controllers/ReexaminationRouter');
const bookingRouter = require('./controllers/BookingRouter')


// import cors from 'cors';
let app = express();

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
app.use('/api/reexamination', reExaminationRouter)
app.use('/api/booking', bookingRouter)










let port = process.env.PORT || 6969;
// Port === undefined => port = 6969
app.listen(port, () => {
    console.log("Backend Nodejs is runing on the port: " + port);
})