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
    var User = {
      name: 'Ragahbe',
      email: 'ashakdwipeea@gmail.com',
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
      conn.query('DELETE FROM user WHERE email = ?', User.email, (err, rows) => {
        conn.release();
        done(err);
      });
    });
  });

  describe('User account process', () => {

    it('should create a new user', (done) => {
      request(app)
        .post('/users')
        .send(User)
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
                conn.query('SELECT email FROM user WHERE name = ?', User.name, (err, result) => {
                  conn.release();
                  if(err) return done(err);
                  else if(result[0].email === User.email) {
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
      .post('/users/login')
      .send({
        email: User.email,
        password: User.password
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("email");
        expect(res.body).to.have.property("phone");
        expect(res.body).to.have.property("token");
        expect(res.body).to.not.have.property("password");
        expect(res.body.name).to.be.equal(User.name);

        User.token = res.body.token;
        done();
      });
    });
  });

  it('should return all the users', (done) => {
    done(new Error("Not Implemented"));
  });


  describe('user functionality', () => {
    var Vehicle = {
      name: 'Vehicle A',
      brand: 'Hyundai'
    };

    before((done) => {
      pool.getConnection((err, conn) => {
        conn.query("INSERT INTO vehicle SET ?", Vehicle, (err, rows) => {
          conn.release();
          done();
        });
      });
    });

    it('should get a list of vehicles', (done) => {
      expect(User.token).to.be.ok;
      request(app)
        .get('/vehicles')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).to.not.have.property("error");
          expect(res.body).to.have.property("vehicles");
          expect(res.body.vehicles).to.be.an('array');
          expect(res.body.vehicles).to.have.deep.property('[0]','brand');
          expect(res.body.vehicles).to.have.deep.property('[0]','name');
          done();
        });
    });

    after((done) => {
      pool.getConnection((err, conn) => {
        conn.query("DELETE FROM vehicle WHERE name = ?", Vehicle.name, (err, rows) => {
          conn.release();
          done();
        });
      });
    })
  });

});
