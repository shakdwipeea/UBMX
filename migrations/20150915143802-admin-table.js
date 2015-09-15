var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('admin', {
    id: { type: 'int', primaryKey: true },
    username: 'string',
    password: 'string'
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('admin', callback);
};
