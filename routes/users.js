var express = require('express');
var router = express.Router();

var user = require('../controller/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
      res.status(500).json({
        "error": err
      });
    } else {
      res.json({
        "message": "User added"
      });
    }
  });
});

module.exports = router;
