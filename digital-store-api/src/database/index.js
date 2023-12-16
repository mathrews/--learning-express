const mysql2 = require("mysql2/promise");

async function execute(SQL) {
  const connection = await mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "Mate-0911",
    database: "digital_store",
    connectionLimit: 5,
    port: 3307,
  });

  const [results] = await connection.query(SQL);
  connection.destroy();

  return results;
}

module.exports = {execute};
