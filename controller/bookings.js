/**
 * Created by Akash on 28-09-2015.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var Bookings = {
    getBookings (cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            var query = `SELECT b.id as id, bt.name as type, v.name as vendor, u.name as user, b.status,
                p.name as problem, s.timing as slot, b.feedback, b.rating
                FROM booking AS b
                INNER JOIN booking_type AS bt ON b.type_id = bt.id
                INNER JOIN vendor AS v ON b.vendor_id = v.id
                INNER JOIN user AS u ON b.user_id = u.id
                INNER JOIN problem AS p ON b.problem_id = p.id
                INNER JOIN slot AS s ON b.slot_id = s.id`;

            conn.query(query, (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Bookings;