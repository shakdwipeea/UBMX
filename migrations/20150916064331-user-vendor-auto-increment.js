var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
  async.series([
    db.changeColumn.bind(db, 'user', 'id', {
      type: 'int',
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
      length:20
    }),
    db.changeColumn.bind(db, 'vendor', 'id', {
      type: 'int',
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
      length:20
    })
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.changeColumn.bind(db, 'user', 'id', {
      type: 'int',
      primaryKey: true,
      notNull: true
    }),
    db.changeColumn.bind(db, 'vendor', 'id', {
      type: 'int',
      primaryKey: true,
      notNull: true
    })
  ], callback)
};
