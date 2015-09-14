var mysql = require('mysql');
var config = require('../config').database;

console.log('The config is', config);

exports.pool = mysql.createPool(config);
