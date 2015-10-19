/**
 * Created by Akash on 12-10-2015.
 */
var express = require('express');
var router = express.Router();

var async = require('async');

var util = require('../lib/helper');


/**
 * @api {get} /slots/vendor_id Get slots available
 * @apiName AddBooking
 * @apiGroup User
 *
 * @apiSuccess {Number[]} slots Available slots for the given vendor
 * @apiError {String} error Cause of the error
 */
router.get('/:vendor_id', (req, res) => {
    var vendor_id = req.params.vendor_id;
    console.log(req.query);
    var slot_day = req.query.slot_day;

    util.getAvailableSlots(vendor_id, slot_day, (err, data) => {
        if (err) {
            res.status(500).json({
                "error": err
            });
        } else {
            res.json({
                "times": data.times
            });
        }
    });

});

router.post('/', (req, res) => {

});

module.exports = router;