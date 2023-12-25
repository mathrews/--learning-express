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

    connection.connect((err) => {
        if (err) {
            console.error("Error connecting to MySQL:", err);
            return;
        }
        console.log("Connected to MySQL!");
    });

    const [results] = await connection.query(SQL);
    connection.destroy();

    return results;
}

module.exports = { execute };
