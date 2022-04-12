const express = require('express')
const router = express.Router();
const connection = require('../config/connectDB');
const nodemailer = require("nodemailer");

router.post('/send', (req, res) => {

    const {email, idBooking} = req.body
    let query = `select examination_hours.slotTime, booking.date, staff.name as doctorName, patient.name as patientName, specialist.departmentName, specialist.price
    from booking, examination_hours, patient, doctor_info, staff, doctor_time, specialist
    where booking.idTime = doctor_time.idTime and booking.idPatient = patient.idPatient and
    booking.idStaff = doctor_info.idStaff and doctor_info.idStaff = staff.idStaff
    and doctor_time.idTime = examination_hours.idTime and booking.idSpecialist = specialist.idSpecialist
    and booking.idBooking = ${idBooking} and patient.email = '${email}' group by booking.idBooking`
    connection.query(query, async (err, result) => {
        
        if (err) return res.status(400).json({ success: false, message: "Erorr get email patient", err });
        let ricverEmail = email;
        let time = result[0].slotTime;
        let date = result[0].date;
        let doctorName = result[0].doctorName;
        let patientName = result[0].patientName;
        let price = result[0].price;
        let departmentName = result[0].departmentName;
        let linkWeb = 'medicalbooking.com';

        
        // create reusable transporter object using the default SMTP transport

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_APP, // generated ethereal user
                pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Medical booking" <medicalbooking.care@gmail.com', // sender address
            to: ricverEmail, // list of receivers
            subject: "Thông tin đặt lịch khám bệnh", // Subject line
            html: `
            <h3>Xin chào ${patientName}</h3>
            <p>Bạn nhận được mail này vì đã đặt lịch khám bệnh online trên Medical Booking</p>
            <div><b>Thông tin đặt lịch khám bệnh:</b></div>
            <div><b>Thời gian: ${time}, ngày: ${date}</b></div>
            <div><b>Bác sĩ: ${doctorName}</b></div>
            <div><b>Chuyên khoa: ${departmentName}</b></div>
            <div><b>Giá khám: ${price}</b></div>
            <p>Cảm ơn bạn đặt sử dụng dịch vụ của chúng tôi, chúng tôi luôn mang lại trãi nghiệm tốt nhất cho khách hàng</p>
            <p>Nếu bạn có thắc mắc gì vui lòng click vào đường link bên dưới:</p>
            <a>${linkWeb}</a>
            `, // html body
        });
        return res.status(200).json({success: true, message: "Send mail success"})

    })
})



module.exports = router
// module.exports = router
