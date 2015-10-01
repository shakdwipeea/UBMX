var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var vendor = require('../controller/vendors');
var config = require('../config');


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
 *
 * @apiSuccess {String} message Success Message
 * @apiError {String} error Cause of the error
 *
 */

 router.post('/', (req, res) => {
   console.log('req params', req.body);
   vendor.addVendor(req.body, (err) => {
     if (err) {
       res.status(412).json({
         "error": err
       });
     } else {
       res.json({
         "message": "User added"
       });
     }
   });
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
