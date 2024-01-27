const mysql2 = require('mysql2/promise');

async function execute(sql){
    let con = await mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Mate-0911',
        database: 'digital_store',
        port: 3307
    });

    let [results] = await con.query(sql);
    con.destroy();

    return results;
}

module.exports = {
    execute
}