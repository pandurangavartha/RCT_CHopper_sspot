console.log("6666666666","---setting")

var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : process.env.NODE_PORT || 3001,
//  database   : {
//    protocol : process.env.SQL_PROTOCOL,
//    query    : { pool: true },
//    host     : process.env.SQL_HOST,
//    database : process.env.SQL_DB_NAME,
//    user     : process.env.SQL_USER,
//    password : process.env.SQL_PASSWORD
//  }
};

module.exports = settings;
