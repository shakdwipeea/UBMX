/**
 * Created by Akash on 01-10-2015.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var Vehicles = {
  getAllVehicles (cb) {
      pool.getConnection((err, conn) => {
          if(err) {
              return cb(err, null);
          }

          conn.query('SELECT * FROM vehicle', (err, rows) => {
              cb(err, rows);
          });
      })
  }
};

module.exports = Vehicles;