var pool = require('../lib/pool').pool;
var bcrypt = require('bcrypt-nodejs');
var mysql = require('mysql');

var Admin = {
  verifyCredentials (admin, cb)  {
    pool.getConnection((err, conn) => {
      console.log(err, conn);
      if (err) {
        conn.release();
        cb(err, null);
      } else {
        var query = mysql.format('SELECT * FROM admin WHERE username = ? ',
            admin.username);

        console.log(query) ;
        conn.query(query , (err, rows) => {
            console.log(typeof conn.release);
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
