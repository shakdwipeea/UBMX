var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var async = require('async');

exports.up = function(db, callback) {
  async.series([
      db.addColumn.bind(db, 'vendor', 'lat', {
        type: 'string'
      }),
      db.addColumn.bind(db, 'vendor', 'lng', {
        type: 'string'
      })
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
      db.removeColumn.bind(db, 'vendor', 'lat'),
      db.removeColumn.bind(db, 'vendor', 'lng')
  ], callback);
};
