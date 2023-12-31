const Sequelize = require("sequelize");
const DB = require("../database/index");

const Brand = DB.define("brand", {
    brand_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    brand_name: {
        type: Sequelize.CHAR(20),
        allowNull: false,
    },
    brand_status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
    },
    createdAt: {
        type: Sequelize.TIME,
        allowNull: true,
    },
    updatedAt: {
        type: Sequelize.TIME,
        allowNull: true,
    },
});

module.exports = Brand;
