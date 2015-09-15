var pool = require('../lib/pool').pool;
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');

var Admin = {
  verifyCredentials (admin, cb)  {
    pool.getConnection((err, conn) => {
      if (err) {
        cb(err, null);
      } else {
        var query = mysql.format('SELECT * FROM admin WHERE username = ? ',
              [ admin.username]);

        console.log(query) ;
        conn.query(query , (err, rows) => {
            conn.release();
            if (rows.length > 0 &&
              bcrypt.compareSync(admin.password, rows[0].password)) {
              cb(null, rows[0]);
            } else {
              cb("Wrong credentials")
            }
        });
      }
    });

  }
}

module.exports = Admin;
