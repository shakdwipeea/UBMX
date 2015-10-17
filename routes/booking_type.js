/**
 * Created by Akash on 01-10-2015.
 */
var express = require('express');
var router = express.Router();
var bookingType = require('../controller/booking_type');

/**
 * @api {get} /booking_type Get booking types
 * @apiName Boking Types
 * @apiGroup IDK
 *
 * @apiSuccess {Object[]} booking_types List of booking_types
 * @apiSuccess {String} booking_types.id Id of booking_types
 * @apiSuccess {String} booking_types.name Name of booking_types
 * @apiError {String} error Cause of the error
 *
 */
router.get('/', (req, res) => {
    bookingType.getAllBookingType((err, types) => {
        if (err) {
            res.status(500).json({
                "error": err
            });
        } else {
            res.json({
                "types": types
            });
        }
    })
});

/**
 * @api {post} /booking_type Get booking types
 * @apiName Boking Types
 * @apiGroup IDK
 *
 * @apiParam {String} name booking type name
 * @apiSuccess {Object[]} booking_type Booking type added
 * @apiSuccess {String} booking_type.id Id of booking_types
 * @apiSuccess {String} booking_type.name Name of booking_types
 * @apiError {String} error Cause of the error
 *
 */
router.post('/', (req, res) => {
    if (req.body.user.user === 'admin') {
        bookingType.addBookingType({
            name: req.body.name
        }, (err, type) => {
            if (err) {
                res.status(500).json({
                    "error": err
                });
            } else {
                res.json({
                    "type": type
                })
            }
        })
    } else {
        res.status(403).json({
            "error": "Not authorized"
        });
    }
});

module.exports = router;