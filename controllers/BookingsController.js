const util = require('util')
const mysql = require('mysql')
const db = require('../db.js')
const nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
const path = require('path')

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM BOOKING'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.status(200).json(response)
        })
    },
    getBookedTimeSlot: (req, res) => {
        let clinic = req.params.scheduleClinic;
        let date = req.params.scheduleDate;
        // console.log("DAY LA CLINIC va date: ", clinic, date);
        let sql = 'select booking_timeslot from booking where booking_clinic = ? and booking_date = ? and booking_status = 0'
        db.query(sql, [clinic, date], (err, response) => {
            if (err) throw err
            // console.log("RESPONSE NÈ: ", response)
            res.status(200).json(response)
        })
    },

    getBookingInfo: (req, res) => {
        clinic = req.params.clinicId;
        let sql = 'select * from booking where booking_clinic = ?;'
        db.query(sql, [clinic], (err, response) => {
            if (err) throw err
            res.status(200).json(response)
        })
    },

    getHistory: (req, res) => {
        customer = req.params.customerId;
        let sql = 'select * from booking b join timeslot t on b.booking_timeslot = t.timeslot_id where booking_customer = ?;'
        db.query(sql, [customer], (err, response) => {
            if (err) throw err
            res.status(200).json(response)
        })
    },

    detail: (req, res) => {
        let sql = 'SELECT * FROM BOOKING WHERE BOOKING_ID = ?'
        db.query(sql, [req.params.bookingId], (err, response) => {
            if (err) throw err
            res.status(200).json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let BOOKING_ID = req.params.bookingId;
        let sql = 'UPDATE BOOKING SET ? WHERE BOOKING_ID = ?'
        db.query(sql, [data, BOOKING_ID], (err, response) => {
            if (err) throw err
            res.status(200).json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let email = req.body.BOOKING_EMAIL;

        let sql = 'INSERT INTO BOOKING SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.status(200).json({ message: 'Insert success!' })
        })

    },

    sendMail: (req, res) => {
        var transporter = nodemailer.createTransport({ // config mail server
            service: 'Gmail',
            auth: {
                user: 'xxx',
                pass: 'xxx'
            }
        });

        const handlebarOptions = {
            viewEngine: {
                extName: ".handlebars",
                partialsDir: path.resolve('./views'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views'),
            extName: ".handlebars",
        }

        transporter.use('compile', hbs(handlebarOptions));

        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'The gioi Nha Khoa',
            to: req.body.BOOKING_EMAIL,
            subject: 'Xác nhận Lịch Khám Nha Khoa',
            template: 'email',
            context: {
                clinic: req.body.BOOKING_CLINIC_NAME,
                address: req.body.BOOKING_CLINIC_ADDRESS,
                date: req.body.BOOKING_DATE,
                time: req.body.BOOKING_TIMESLOT_NAME,
                service: req.body.BOOKING_SERVICE,
                customer: req.body.BOOKING_CUSTOMER_NAME,
                male: req.body.BOOKING_CUSTOMER_MALE,
                note: req.body.BOOKING_NOTE
            }
        }

        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err);
                res.redirect('/');
            } else {
                console.log('Message sent: ' + info.response);
                res.redirect('/');
            }
        });
    },

    delete: (req, res) => {
        let sql = 'DELETE FROM BOOKING WHERE BOOKING_ID = ?'
        db.query(sql, [req.params.bookingId], (err, response) => {
            if (err) throw err
            res.status(200).json({ message: 'Delete success!' })
        })
    }
}
