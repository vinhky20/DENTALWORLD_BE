const util = require('util')
const mysql = require('mysql')
const db = require('../db.js')

module.exports = {
    clinicLogin: (req, res) => {
        let username = req.body.CLINIC_URN;
        let password = req.body.CLINIC_PWD;
        if (username && password) {
            query = `SELECT * FROM CLINIC WHERE CLINIC_URN = "${username}"`;

            db.query(query, function (error, data) {
                if (error) throw error;
                if (data.length > 0) {
                    res.status(200).json(data);
                }
                else {
                    res.status(500).json(error);
                }
                res.end();
            });
        }
        else {
            res.send('Please enter username and password');
            res.end();
        }


        // let sql = 'SELECT * FROM CLINIC'
        // db.query(sql, (err, response) => {
        //     if (err) throw err
        //     res.status(200).json(response)
        // })
    },
    customerLogin: (req, res) => {
        let username = req.body.CUSTOMER_URN;
        let password = req.body.CUSTOMER_PWD;
        if (username && password) {
            query = `SELECT * FROM CUSTOMER WHERE CUSTOMER_URN = "${username}"`;

            db.query(query, function (error, data) {
                if (error) throw error;
                if (data.length > 0) {
                    res.status(200).json(data);
                }
                else {
                    res.status(500).json(error);
                }
                res.end();
            });
        }
        else {
            res.send('Please Enter Email Address and Password Details');
            res.end();
        }

    }
}