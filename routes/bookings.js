/**
 * Created by Akash on 28-09-2015.
 */
var express = require('express');
var router = express.Router();

var bookings = require('../controller/bookings');

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
 *
 * @apiSuccess {String} success Success Message
 * @apiError {String} error Cause of the error
 *
 */
router.post('/', (req, res) => {
    res.status(412).json({
        "error": "Not Implemented"
    });
});

module.exports = router;
