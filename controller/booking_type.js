/**
 * Created by Akash on 01-10-2015.
 */
var pool = require('../lib/pool').pool,
    mysql = require('mysql'),
    util = require('../lib/helper');

var BookingType = {
    getAllBookingType (cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                conn.release();
                return cb(err, null);
            }

            conn.query("SELECT * FROM booking_type", (err, rows) => {
                conn.release();
                cb(err, rows);
            })
        })
    },

    /**
     * @param {object} type Booking type details
     * @param {string} type.name Booking type name
     *
     */
        addBookingType (type, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                conn.release();
                return cb(err, null);
            }

            type.id = util.random();
            console.log("Type ", type);
            conn.query("INSERT INTO booking_type SET ? ", type, (err, row) => {
                conn.release();
                cb(err, row);
            });
        });
    }
};

module.exports = BookingType;