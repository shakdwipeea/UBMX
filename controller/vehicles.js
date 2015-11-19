/**
 * Created by Akash on 01-10-2015.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');
var helper = require('../lib/helper');

exports.getAllVehicles = (cb) => {
    pool.getConnection((err, conn) => {
        if (err) {
            return cb(err, null);
        }

        conn.query('SELECT * FROM vehicle', (err, rows) => {
            conn.release();
            cb(err, rows);
        });
    })
};

exports.addVehicle = (vehicle, cb) => {
    pool.getConnection((err, conn) => {
        if (err) {
            conn.release();
            return cb(err);
        }

        vehicle.id = helper.random();
        conn.query("INSERT INTO vehicle SET ? ", vehicle, (err, rows) => {
            conn.release();
            cb(err);
        });
    });
};
