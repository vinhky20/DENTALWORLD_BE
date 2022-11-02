const util = require('util');
const mysql = require('mysql');
const db = require('../db.js');

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM CLINIC_SCHEDULE'
        db.query(sql, (err, response) => {
            if (err) throw err
            res.status(200).json(response)
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM CLINIC_SCHEDULE WHERE SCHEDULE_ID = ?'
        db.query(sql, [req.params.scheduleId], (err, response) => {
            if (err) throw err
            res.status(200).json(response[0])
        })
    },
    update: (req, res) => {
        let data = req.body;
        let SCHEDULE_ID = req.params.scheduleId;
        let sql = 'UPDATE CLINIC_SCHEDULE SET ? WHERE SCHEDULE_ID = ?'
        db.query(sql, [data, SCHEDULE_ID], (err, response) => {
            if (err) throw err
            res.status(200).json({ message: 'Update success!' })
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO CLINIC_SCHEDULE SET ?'
        db.query(sql, [data], (err, response) => {
            if (err) throw err
            res.status(200).json({ message: 'Insert success!' })
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM CLINIC_SCHEDULE WHERE SCHEDULE_ID = ?'
        db.query(sql, [req.params.scheduleId], (err, response) => {
            if (err) throw err
            res.status(200).json({ message: 'Delete success!' })
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
    }

}
