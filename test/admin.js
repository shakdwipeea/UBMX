var http = require('http');

var app = require('../app.js');
var port = 3000;

var assert = require('assert');
var expect = require('chai').expect;
var request = require('supertest');
var mysql = require('mysql');
var pool = require('../lib/pool.js').pool;

var bcrypt = require('bcrypt-nodejs');

describe('app', () => {
  var server = {};
    var Admin = {
      id: Date.now(),
      username: 'admin',
      password: 'TeamNan'
    };

  before((done) => {
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port, (err, result) => {
      if (err) {
        done(err);
      } else {
        pool.getConnection((err, conn) => {
          if (err) {
            return done(err);
          }
          conn.query('INSERT INTO admin SET ? ', {
            id: Math.random(),
            username: Admin.username,
            password: bcrypt.hashSync(Admin.password)
          }, (err, rows) => {
              if (err) {
                done(err);
              } else {
                done();
              }
          });
        })

      }
    });
  });

  after((done) => {
    server.close();
    pool.getConnection((err, conn) => {
      conn.query('DELETE FROM admin WHERE username = ?', Admin.username, (err, rows) => {
        conn.release();
        done(err);
      });
    });
  });

  describe('Admin works', () => {

    it('should login the admin and return a token', (done) => {
      request(app)
      .post('/admin')
      .send({
        username: Admin.username,
        password: Admin.password
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property("username");
        expect(res.body).to.have.property("token");
        expect(res.body).to.not.have.property("password");
        expect(res.body.username).to.be.equal(Admin.username);
        done();
      });
    });
  });

});
