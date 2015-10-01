var express = require('express');
var router = express.Router();
var vehicles = require('../controller/vehicles');

/**
 * @api {get} /vehicles Get vehicles
 * @apiName Vehicle list
 * @apiGroup User
 *
 * @apiSuccess {Object[]} vehicles List of vehicles
 * @apiSuccess {String} vehicles.name Name of vehicle
 * @apiSuccess {String} vehicles.brand Brand of vehicle
 * @apiError {String} error Cause of the error
 *
 */

router.get('/', (req, res) => {
  vehicles.getAllVehicles((err, vehicles) => {
    if (err) {
      res.status(500).json({
        "error": err
      });
    } else {
      res.json({
        "vehicles": vehicles
      });
    }
  });
});

/**
 * @api {post} /vehicles Add a Vehicle
 * @apiName AddVehicle
 * @apiGroup Admin
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
