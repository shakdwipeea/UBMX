var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var user = require('../controller/users');
var config = require('../config');

/**
 * @api {get} /users Get user listing
 * @apiName GetUser
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Object[]} users List of users
 * @apiSuccess {String} users.name Name of user
 * @apiSuccess {String} users.email Email of user
 * @apiSuccess {String} users.phone Phone of user
 * @apiError {String} error Cause of the error
 *
 */
router.get('/', function (req, res) {
  /**
   * todo add jwt authentication
   */

  user.getAllUsers((err, users) => {
    if (err) {
      res.status(500).json({
        "error": err
      });
    } else {
      res.json({
        "users": users
      });
    }
  });
});


/**
 * @api {post} /users User signup
 * @apiName AddUser
 * @apiGroup User
 *
 * @apiParam {String} name Full Name of user
 * @apiParam {String} password Password for user
 * @apiParam {String} email Email of the user
 * @apiParam {String} phone Phone number of the user
 *
 * @apiSuccess {String} message Success Message
 * @apiError {String} error Cause of the error
 *
 */

router.post('/', (req, res, next) => {
  console.log('req params', req.body);
  user.addUser(req.body, (err) => {
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
 * @api {post} /users/login User Login
 * @apiName LoginUser
 * @apiGroup User
 *
 * @apiParam {String} password Password for user
 * @apiParam {String} email Email of the user
 *
 * @apiSuccess {String} name Name of user
 * @apiSuccess {String} email Email of user
 * @apiSuccess {String} phone Phone of user
 * @apiSuccess {String} token Generated token
 * @apiError {String} error Cause of the error
 *
 */


router.post('/login', (req, res) => {
  user.verifyUser(req.body, (err, userProfile) => {
    if(err) {
      res.status(412).json({
        "error": err
      });
    } else {
      var token = jwt.sign({
        id: userProfile.id,
        email: userProfile.email,
        password: userProfile.password,
        user: 'user'
      }, config.jwt.secret);

      userProfile.token = token;
      delete userProfile.password;
      res.json(userProfile);
    }
  });
});

module.exports = router;
