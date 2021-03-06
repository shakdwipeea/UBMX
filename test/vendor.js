var http = require('http');

var app = require('../app.js');
var port = 3000;

var assert = require('assert');
var expect = require('chai').expect;
var request = require('supertest');
var mysql = require('mysql');
var pool = require('../lib/pool.js').pool;

describe('app', () => {
  var server = {};
    var Vendor = {
      name: 'Antash',
      email: 'antashmishra@in.com',
      password: 'akash'
    };

  before((done) => {
    app.set('port', port);
    server = http.createServer(app);
    server.listen(port, (err, result) => {
      if (err) {
        done(err);
      } else {
        done();
      }
    });
  });

  after((done) => {
    server.close();
    pool.getConnection((err, conn) => {
      conn.query('DELETE FROM vendor WHERE email = ?', Vendor.email, (err, rows) => {
        conn.release();
        done(err);
      });
    });
  });

  describe('Vendor account process', () => {



    it('should create a new vendor', (done) => {
      request(app)
        .post('/vendors')
        .send(Vendor)
        .expect(200)
        .end((err, res) => {
          if(err) {
            console.log('Errpr si', err, res.text);
            return done(err);
          } else {
            console.log('Checking db existence');
            pool.getConnection((err, conn) => {
              if(err) {
               return done(err);
              } else {
                conn.query('SELECT email FROM vendor WHERE name = ?', Vendor.name, (err, result) => {
                  conn.release();
                  if(err) return done(err);
                  else if (result.length == 0) {
                    done("Vendor not added");
                  }
                  else if(result[0].email === Vendor.email) {
                    done();
                  } else {
                    done("Not signed up");
                  }
                });
              }
            });
          }
        });
    });

    it('should login the user and return a token', (done) => {
      request(app)
      .post('/vendors/login')
      .send({
        email: Vendor.email,
        password: Vendor.password
      })
      .expect(200)
      .end((err, res) => {
        console.log('Response is ',res.text)
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("email");
        expect(res.body).to.have.property("token");
        expect(res.body).to.not.have.property("password");
        expect(res.body.name).to.be.equal(Vendor.name);
        done();
      });
    });
  });

});
