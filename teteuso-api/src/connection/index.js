const mariadb = require('mariadb');

// Create a connection pool
const pool = mariadb.createPool({
  host: 'MateusNote',
  user: 'root',
  password: 'Mate-0911',
  database: 'musicforum',
  connectionLimit: 5, // adjust as needed
});

// Function to execute queries
async function queryDatabase(query) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(query);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
}

module.exports = queryDatabase;