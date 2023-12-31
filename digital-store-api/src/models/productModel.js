const Sequelize = require("sequelize");
const DB = require("../database/index");

const Product = DB.define("product", {
    product_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    product_image: {
        type: Sequelize.TEXT,
    },
    product_discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    product_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    product_sizes: {
        type: Sequelize.CHAR(50),
    },
    product_name: {
        type: Sequelize.CHAR(20),
        allowNull: false,
    },
    product_colors: {
        type: Sequelize.CHAR(100),
    },
    product_status: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
    },
    product_category: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    product_brand: {
        type: Sequelize.INTEGER,
        allowNull: false
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

module.exports = Product;
