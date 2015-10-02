/**
 * Created by Akash on 01-10-2015.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var BookingType = {
    getAllBookingType (cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query("SELECT * FROM booking_type", (err, rows) => {
                cb(err, rows);
            })
        })
    }
};

module.exports = BookingType;