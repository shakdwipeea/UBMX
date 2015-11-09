/**
 * Created by Akash on 01-10-2015.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');
var util = require('../lib/helper');

var Problems = {
    getAllProblems (cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                conn.release();
                return cb(err, null);
            }

            conn.query("SELECT * FROM problem", (err, rows) => {
                conn.release();
                cb(err, rows);
            })
        })
    },
    /**
     * @param {object} type Problem type details
     * @param {string} type.name Problem type name
     */
        addProblem (type, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                conn.release();
                return cb(err, null);
            }

            type.id = util.random();

            conn.query("INSERT INTO problem SET ? ", type, (err, row) => {
                conn.release();
                cb(err, row);
            });
        });
    }
};

module.exports = Problems;