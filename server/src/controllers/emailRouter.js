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
        let linkWeb = 'https://www.facebook.com/Medicalbooking-%C4%90%E1%BA%B7t-l%E1%BB%8Bch-kh%C3%A1m-b%E1%BB%87nh-online-110684594900582';

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
            subject: "Th??ng tin ?????t l???ch kh??m b???nh", // Subject line
            html: `
            <h3>Xin ch??o ${patientName}</h3>
            <p>B???n nh???n ???????c mail n??y v?? ???? ?????t l???ch kh??m b???nh online tr??n Medical Booking</p>
            <div><b>Th??ng tin ?????t l???ch kh??m b???nh:</b></div>
            <div><b>Th???i gian: ${time}, ng??y: ${date}</b></div>
            <div><b>B??c s??: ${doctorName}</b></div>
            <div><b>Chuy??n khoa: ${departmentName}</b></div>
            <div><b>Gi?? kh??m: ${price}</b></div>
            <p>C???m ??n b???n ?????t s??? d???ng d???ch v??? c???a ch??ng t??i, ch??ng t??i lu??n mang l???i tr??i nghi???m t???t nh???t cho kh??ch h??ng</p>
            <p>N???u b???n c?? th???c m???c g?? vui l??ng click v??o ???????ng link b??n d?????i:</p>
            <a href="${linkWeb}">Chuy???n ?????n trang ch???</a>
            `, // html body
        });
        return res.status(200).json({success: true, message: "Send mail success"})

    })
})



module.exports = router



