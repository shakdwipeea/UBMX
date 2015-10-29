/**
 * Created by Akash on 28-09-2015.
 */
var express = require('express');
var router = express.Router();

var bookings = require('../controller/bookings'),
    slots = require('../controller/slots'),
    utils = require('../lib/helper');

/**
 * @api {get} /bookings Get all bookings
 * @apiName Booking list
 * @apiGroup Admin
 *
 * @apiSuccess {Object[]} bookings List of bookings
 * @apiSuccess {String} bookings.type Type of booking
 * @apiSuccess {String} bookings.vendor Vendor for which booking was done
 * @apiSuccess {String} bookings.user_name User name who made the booking
 * @apiSuccess {String} bookings.status Status of booking
 * @apiSuccess {String} bookings.problem Problem for which booking was made
 * @apiSuccess {String} bookings.slot Slot for which booking was done
 * @apiSuccess {String} bookings.feedback Feedback of booking
 * @apiSuccess {String} bookings.rating Rating for the booking
 * @apiError {String} error Cause of the error
 *
 */

router.get('/', (req, res) => {
    /**
     * todo proper access rights
     */
    console.log(req.query);
    if (req.body.user.user == "admin") {
        bookings.getBookings((err, bookings) => {
            if (err) {
                res.status(500).json({
                    "error": err
                });
                return;
            }

            res.json({
                "bookings": bookings
            });
        });
    } else if (req.body.user.user == "vendor") {
        var vendor_id = req.body.user.id;
        console.log("On Vendor");
        bookings.getBookingByVendor(vendor_id, (err, rows) => {
            if (err) {
                res.status(500).json({
                    "error": err
                })
            } else {
                res.json({
                    "bookings": rows
                })
            }
        })
    } else {
        console.log("Booking ");
        res.status(403).json({
            "error": "Not authorized"
        })
    }


});


router.get('/:user_id', (req, res) => {
    bookings.getBookingByUserId(req.params.user_id, (err, bookings) => {
        if (err) {
            res.status(500).json({
                "error": err
            });
        } else {
            res.json({
                "bookings": bookings
            });
        }
    })
});

router.get('/:vendorId', (req, res) => {
    if (req.user.user == "admin" || req.user.user == "vendor") {
        bookings.getBookingByVendor(req.params.vendorId, (err, rows) => {
            if (err) {
                res.status(500).json({
                    "error": err
                })
            } else {
                res.json({
                    "bookings": rows
                })
            }
        })
    } else {
        res.status(403).json({
            "error": "Not authorized"
        })
    }
});

/**
 * @api {post} /bookings Add a Booking
 * @apiName AddBooking
 * @apiGroup User
 *
 * @apiParam {String} token Token for admin
 * @apiParam {String} type_id Booking type id
 * @apiParam {String} vendor_id Vendor id of vendor for which booking is done
 * @apiParam {String} problem_id Problem id of user's problem
 * @apiParam {Number} slot The Slot used
 * @apiParam {String} date The date for booking eg. 12 August, 2014
 * @apiParam {String} vehicle_id Vehice id
 *
 * @apiSuccess {Object[]} booking Booking object
 * @apiSuccess {String} booking.id Booking id of the booking
 * @apiError {String} error Cause of the error
 *
 */
router.post('/', (req, res) => {
    var booking = {
        user_id: req.body.user_id,
        type_id: req.body.type_id,
        vendor_id: req.body.vendor_id,
        problem_id: req.body.problem_id,
        vehicle_id: req.body.vehicle_id,
        pickup_add: req.body.pickup_add,
        drop_add: req.body.drop_add,
        status: "Pending"
    };

    var slot = parseInt(req.body.slot);
    var date = req.body.date;

    utils.getAvailableSlots(booking.vendor_id, date, (err, data) => {
        if (err) {
            res.status(500).json({
                "error": err
            });
        } else {
            console.log(data.times, "k", slot);
            if (data.times.indexOf(parseInt(slot)) == -1) {
                res.status(500).json({
                    "error": "Slot not available"
                });
            } else {
                var update = false;
                update = data.slotsAvailable.indexOf(slot) !== -1;

                /**
                 * todo check if a slot for another day is updated
                 */

                if (update) {
                    var originalSlot = data.slots[data.slotsAvailable.indexOf(slot)];

                    slots.updateSlot({
                        booking_done: originalSlot.booking_done + 1
                    }, originalSlot, (err, slot) => {
                        completeBooking(slot.id);
                    });
                } else {
                    slots.addSlot({
                        timing: slot * 100 + "-" + (slot + 1) * 100,
                        booking_done: 1,
                        booking_limit: data.vendor.capacity_per_slot,
                        date: date,
                        vendor_id: data.vendor.id
                    }, (err, slot) => {
                        completeBooking(slot.id);
                    });
                }

                function completeBooking(slot_id) {
                    booking.slot_id = slot_id;

                    bookings.doBooking(booking, (err, booking) => {
                        if (err) {
                            res.status(500).json({
                                "error": err
                            });
                        } else {
                            res.json({
                                "booking": booking
                            });
                        }
                    });
                }


            }
        }
    });


});

router.post('/status', (req, res) => {
    if (req.body.user.user == 'vendor' || req.body.user.user == "admin") {
        console.log(req.body);
        bookings.changeStatusOfBooking(req.body, (err) => {
            if (err) {
                res.status(500).json({
                    "error": err
                });
            } else {
                res.json({
                    "message": "Done"
                });
            }
        })
    } else {
        res.status(403).json({
            "error": "Not authorized"
        })
    }
});

module.exports = router;
