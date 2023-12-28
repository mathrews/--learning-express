const { Sequelize } = require('sequelize');

async function execute(SQL) {
    const sequelize = new Sequelize('digital_store', 'root', 'Mate-0911', {
        host: 'localhost',
        dialect: 'mysql',
        port: 3307
      });

    // const connection = await mysql2.createConnection({
    //     host: "localhost",
    //     user: "root",
    //     password: "Mate-0911",
    //     database: "digital_store",
    //     connectionLimit: 5,
    //     port: 3307,
    // });
    
    const [results] = await sequelize.query(SQL);
    sequelize.close();

    return results;
}

module.exports = { execute };
