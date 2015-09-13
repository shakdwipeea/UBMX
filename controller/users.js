var { pool } = require('../lib/pool');
var bcrypt = require('bcrypt-nodejs');

var user = {
    addUser (user, cb) {

      user.password = bcrypt.hashSync(user.password);

      this.getUser(user.email, (err, users) => {       
        if(err || users) {
         cb(err || "User already exists");
        } else if (users.length === 0) {
          pool.getConnection((err, conn) => {
            conn.query('INSERT INTO user SET ?', user, (err, result) => {
              conn.release();
              cb(err);
            })
          })
        }
      })

    },

    getuser (email, cb)  {

      pool.getConnection((err, conn) => {
          conn.query('SELECT * FROM user WHERE email=?', email, (err, rows) => {
              conn.release();
              cb(err, rows); 
          })
      })

    }
}

module.exports = user;

