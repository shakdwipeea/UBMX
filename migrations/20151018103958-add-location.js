var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

var async = require('async');

exports.up = function(db, callback) {
  db.addColumn('vendor', 'location', {
    type: 'string',
    notNull: true
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('vendor', 'location', callback);
};
