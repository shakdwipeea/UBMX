/**
 * Created by Akash on 12-10-2015.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var util = require('../lib/util');

var Slots = {
    getVendorSlots (vendor_id, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }

            conn.query('SELECT * FROM slot WHERE vendor_id = ?', vendor_id, (err, slots) => {
                conn.release();
                return cb(err, slots);
            });
        });
    },

    addSlot (slot, cb) {
        pool.getConnection ((err, conn) => {
           if (err) {
               return cb(err, null);
           }

           slot.id = util.random();

           conn.query('INSERT INTO slot SET ?', slot, (err, slot) => {
               conn.release();
               cb(err, slot);
           });

        });
    },

    updateSlot (slot, originalSlot, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                return cb(err, null);
            }


            conn.query("UPDATE slots SET ? WHERE ID = ?",
                [{
                    booking_done: slot.booking_done
                } , originalSlot.id],
                (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    }
};

module.exports = Slots;