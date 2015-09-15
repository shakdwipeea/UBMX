var pool = require('../lib/pool').pool;
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');

var Vendor = {
    addVendor (vendor, cb) {

      vendor.password = bcrypt.hashSync(vendor.password);

      this.getVendor(vendor.email, (err, vendors) => {
        if(err || vendors.length > 0) {
         cb(err || "vendor already exists");
        } else if (vendors.length === 0) {
          pool.getConnection((err, conn) => {
            if (err) {
              cb(err);
            } else {
              var query = mysql.format('INSERT INTO vendor SET ?', vendor);
              console.log('Query is',query);
              conn.query(query, (err, result) => {
                conn.release();
                cb(err);
              });
            }
          });
        }
      });

    },

    getVendor (email, cb)  {
      pool.getConnection((err, conn) => {
        if (err) {
          cb(err, null);
        } else {
          var query = mysql.format('SELECT * FROM vendor WHERE email = ?',[email]);
         console.log(query) ;
          conn.query(query , (err, rows) => {
              conn.release();
              cb(err, rows);
          });
        }
      });

    },

    verifyVendor (vendor, cb) {
      console.log('Vendot he', vendor);
      this.getVendor(vendor.email, (err, vendors) => {
        console.log('Got vendors', err, vendors)
        if(err) {
          cb(err, null);
        } else if(vendors.length > 0) {
          var vendorFromDb = vendors[0];

          if(bcrypt.compareSync(vendor.password, vendorFromDb.password)) {
            cb(null, vendorFromDb);
          } else {
            console.log('Paa', vendor.password, vendorFromDb.password);
            cb("Wrong Password", null);
          }
        } else {
          cb("No vendor found", null);
        }
      });
    }
};

module.exports = Vendor;
