const pool = require("./connection");

async function queryDatabase(query) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(query);
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      conn.end();
    }
  }
}

module.exports = queryDatabase;
