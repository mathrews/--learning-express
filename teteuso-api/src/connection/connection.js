const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Mate-0911',
  database: 'musicforum',
  connectionLimit: 5
});

module.exports = pool;