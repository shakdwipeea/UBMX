var pool = require('../lib/pool').pool;
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');

var e = require('../lib/helper');

var Vendor = {
    addVendor (vendor, cb) {

        console.log("Util", e);
      vendor.password = bcrypt.hashSync(vendor.password);
        vendor.id = e.myRandomNumber();

      this.getVendor(vendor.email, (err, vendors) => {
        if(err || vendors.length > 0) {
         cb(err || "vendor already exists");
        } else if (vendors.length === 0) {
          pool.getConnection((err, conn) => {
            if (err) {
              conn.release();
              cb(err);
            } else {
              var query = mysql.format('INSERT INTO vendor SET ?', vendor);
              console.log('Query is',query);
              conn.query(query, (err, result) => {
                conn.release();
                  cb(err, vendor);
              });
            }
          });
        }
      });

    },

    getVendor (email, cb)  {
      pool.getConnection((err, conn) => {
        if (err) {
          conn.release();
          conn.release();
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

    getAllVendors (cb) {
        pool.getConnection((err, conn) => {
            if (err) {
              conn.release();
                return cb(err, null);
            }

            /**
             * todo get vendor's type of work
             */

            conn.query(`SELECT v.id, v.name, v.capacity_per_slot, v.timings, v.email, v.lat, v.lng FROM vendor as v`,
                (err, rows) => {
                    conn.release();
                    cb(err, rows);
                });
        });
    },

    verifyVendor (vendor, cb) {
        console.log('Vendor he', vendor);
      this.getVendor(vendor.email, (err, vendors) => {
          console.log('Got vendors', err, vendors);
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
    },

    getVendorById (id, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
              conn.release();
                return cb(err, null);
            }

            conn.query('SELECT * FROM vendor WHERE id = ?', id, (err, rows) => {
                conn.release();

                if (rows && rows.length > 0) {
                    cb(err, rows[0]);
                } else {
                    cb("No such vendor", null);
                }

            });
        })
    },

    /**
     * @param {object} data Data to pass
     * @param {number} data.vendor_id vendor id
     * @param {number[]} data.booking_type_ids booking type ids
     *
     */
        addBookingType (data, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
              conn.release();
                return cb(err, null);
            }

            var values = data.booking_type_ids.map((booking_type_id) => {
                return [e.myRandomNumber(), parseInt(booking_type_id), data.vendor_id];
            });
            console.log(values);
            var sql = "INSERT INTO booking_type_vendor (id, type_id, vendor_id) VALUES ? ";

            conn.query(sql, [values], (err) => {
                conn.release();
                console.log("ad booking type", err);
                cb(err);
            });
        });
    },

    /**
     * @param {object} data Data to pass
     * @param {number} data.vendor_id vendor id
     * @param {number[]} data.problem_type_ids problem type ids
     *
     */
        addProblemType (data, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
              conn.release();
                return cb(err, null);
            }

            var values = data.problem_type_ids.map((problem_type_id) => {
                return [e.myRandomNumber(), parseInt(problem_type_id), data.vendor_id];
            });

            var sql = "INSERT INTO problem_vendor (id, problem_id, vendor_id) VALUES ? ";
            console.log(values);
            conn.query(sql, [values], (err) => {
                conn.release();
                console.log("Error add problem type", err);
                cb(err);
            });
        });
    },

    getByLocation (location, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
              conn.release();
                return cb(err, null);
            }

            conn.query("SELECT * FROM vendor WHERE location = ?", location, (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Vendor;
