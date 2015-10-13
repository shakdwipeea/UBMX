/**
 * Created by Akash on 28-09-2015.
 */
var express = require('express');
var router = express.Router();

var bookings = require('../controller/bookings'),
    slots = require('../controller/slots'),
    utils = require('../lib/util');

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
 *
 * @apiSuccess {Object[]} booking Booking object
 * @apiSuccess {String} booking.id Booking id of the booking
 * @apiError {String} error Cause of the error
 *
 */
router.post('/', (req, res) => {
    var booking = {
        user_id: req.body.user.id,
        type_id: req.body.type_id,
        vendor_id: req.body.vendor_id,
        problem_id: req.body.problem_id,
        status: "Pending"
    };

    var slot = req.body.slot;
    var date = req.body.date;

    utils.getAvailableSlots(booking.vendor_id, (err, data) => {
        if (err) {
            res.status(500).json({
                "error": err
            });
        } else {
            if (data.times.indexOf(slot) == -1) {
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

module.exports = router;
