var http = require('http');

var app = require('../app.js');
var port = 3000;

var assert = require('assert');
var request = require('supertest');
var mysql = require('mysql');
var pool = require('../lib/pool.js').pool;

describe('app', () => {
  var server = {};
    var User = {
      name: 'Antash',
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
  });

});
