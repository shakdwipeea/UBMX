var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken'),
    vendor = require('../controller/vendors'),
    config = require('../config'),
    async = require('async');


/**
 * @api {get} /vendors Get All vendor
 * @apiName GetAllVendors
 * @apiGroup Vendor
 *
 *
 * @apiSuccess {Object[]} vendors List of all vendors
 * @apiSuccess {String} id id of vendor
 * @apiSuccess {String} name name of vendor
 * @apiSuccess {String} capacity_per_slot capacity of vendor per slot
 * @apiSuccess {String} timings timings for vendor
 * @apiSuccess {String} email email for vendor
 * @apiError {String} error Cause of the error
 *
 */
router.get('/', (req, res) => {
    vendor.getAllVendors((err, vendors) => {
        if (err) {
            res.status(500).json({
                "error": err
            });
        } else {
            res.json({
                "vendors": vendors
            });
        }
    });
});


/**
 * @api {post} /vendors Vendor signup
 * @apiName AddVendor
 * @apiGroup Vendor
 *
 * @apiParam {String} name Full Name of vendor
 * @apiParam {String} password Password for vendor
 * @apiParam {String} email Email of the vendor
 * @apiParam {String} capacity_per_slot
 * @apiParam {String} timings Timings of vendor
 * @apiParam {Number[]} problem_ids Problem ids supported
 * @apiParam {Number[]} booking_type_ids Booking types supported
 *
 * @apiSuccess {String} message Success Message
 * @apiError {String} error Cause of the error
 *
 */

 router.post('/', (req, res) => {
     console.log("req params ", req.body);

     if (req.body.user.user === 'admin') {
         vendor.addVendor({
             name: req.body.name,
             capacity_per_slot: req.body.capacity_per_slot,
             timings: req.body.timings,
             email: req.body.email,
             password: req.body.password
         }, (err, newVendor) => {
             if (err) {
                 res.status(500).json({
                     "error": err
                 });
             } else {
                 async.parallel([
                     (callback) => {
                         vendor.addBookingType({
                             vendor_id: newVendor.id,
                             booking_type_ids: req.body.booking_type_ids
                         }, callback);
                     },
                     (callback) => {
                         vendor.addProblemType({
                             vendor_id: newVendor.id,
                             problem_type_ids: req.body.problem_ids
                         }, callback);
                     }
                 ], (err) => {
                     if (err) {
                         res.status(500).json({
                             "error": err
                         })
                     } else {
                         res.json({
                             "message": "Vendor added Successfully"
                         })
                     }
                 })
             }
         })
     } else {
         res.status(403).json({
             "error": "Not authorized"
         });
     }
 });

/**
 * @api {post} /vendors/login Vendor Login
 * @apiName LoginVendor
 * @apiGroup Vendor
 *
 * @apiParam {String} password Password for vendor
 * @apiParam {String} email Email of the vendor
 *
 * @apiSuccess {String} name Name of vendor
 * @apiSuccess {String} email Email of vendor
 * @apiSuccess {String} timings Timings of vendor
 * @apiSuccess {String} capacity_per_slot Capacity per slot of vendor
 * @apiSuccess {String} token Generated token
 * @apiError {String} error Cause of the error
 *
 */


router.post('/login', (req, res) => {
  vendor.verifyVendor(req.body, (err, vendorProfile) => {
    if(err) {
      res.status(412).json({
        "error": err
      });
    } else {
      var token = jwt.sign({
        email: vendorProfile.email,
        password: vendorProfile.password,
        user: 'vendor'
      }, config.jwt.secret);

      vendorProfile.token = token;
      delete vendorProfile.password;
      res.json(vendorProfile);
    }
  });

});

module.exports = router;
