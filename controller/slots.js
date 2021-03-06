/**
 * Created by Akash on 12-10-2015.
 */
var pool = require('../lib/pool').pool;
var mysql = require('mysql');

var util = require('../lib/helper');

var Slots = {
    getVendorSlots (vendor_id, slot_day, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                conn.release();
                return cb(err, null);
            }

            conn.query('SELECT * FROM slot WHERE vendor_id = ? AND date = ?', [vendor_id, slot_day], (err, slots) => {
                conn.release();
                return cb(err, slots);
            });
        });
    },

    addSlot (slot, cb) {
        pool.getConnection ((err, conn) => {
           if (err) {
                conn.release();
               return cb(err, null);
           }

            slot.id = require('../lib/helper').random();
           console.log(util.random);

            conn.query('INSERT INTO slot SET ?', slot, (err, rows) => {
               conn.release();
               cb(err, slot);
           });

        });
    },

    updateSlot (slot, originalSlot, cb) {
        pool.getConnection((err, conn) => {
            if (err) {
                conn.release();
                return cb(err, null);
            }


            conn.query("UPDATE slots SET ? WHERE ID = ?",
                [{
                    booking_done: slot.booking_done
                } , originalSlot.id],
                (err, rows) => {
                conn.release();
                    cb(err, originalSlot);
            });
        });
    }
};

module.exports = Slots;