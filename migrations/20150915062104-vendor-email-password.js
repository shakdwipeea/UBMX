var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var async = require('async');

exports.up = function(db, callback) {
  async.series([
    db.addColumn.bind(db, 'vendor', 'email', {
      type: 'string',
      notNull: true
    }),
    db.addColumn.bind(db, 'vendor', 'password', {
      type: 'string',
      notNull: true
    })
  ], callback)
};

exports.down = function(db, callback) {
  async.series([
    db.removeColumn.bind(db, 'vendor', 'email'),
    db.removeColumn.bind(db, 'vendor', 'password')
  ], callback);
};
