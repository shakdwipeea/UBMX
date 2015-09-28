var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

var config = require('../config');
var admin = require('../controller/admin');

router.get('/', (req, res) => {
  res.render('admin');
});

/**
 * @api {post} /admin Vendor login
 * @apiName AdminLogin
 * @apiGroup Admin
 *
 * @apiParam {String} username Username of admin
 * @apiParam {String} password Password for admin
 *
 * @apiSuccess {String} token Login token
 * @apiError {String} error Cause of the error
 *
 */

 router.post('/', (req, res) => {
   admin.verifyCredentials(req.body, (err, adminProf) => {
     if (err) {
       res.status(412).json({
         "error": err
       })
     } else {
       //sign the credentials
       var token = jwt.sign({
         email: adminProf.username,
         password: adminProf.password,
         user: 'admin'
       }, config.jwt.secret);

       adminProf.token = token;
       delete adminProf.password;
       res.json(adminProf);
     }
   })
 });


 module.exports = router;
