const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Mate-0911',
  database: 'musicforum',
  connectionLimit: 5,
  port: 3306
});

module.exports = pool;