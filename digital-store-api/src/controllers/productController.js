const DB = require("../database/index");
const table = "products";

const listAll = async () => {
    return {
        type: "Success",
        response: await DB.execute(`SELECT * FROM ${table}`),
        status: 200,
    };
};

const listOne = async (id) => {
    try {
        const response = await DB.execute(
            `SELECT * FROM ${table} WHERE product_id = ${id}`
        );

        if (response[0] == null) {
            throw new Error(
                "Este id não foi encontrado. Tente novamente com o id correto."
            );
        } else {
            return {
                type: "Success",
                response: response,
                status: 200,
            };
        }
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
            status: 404,
        };
    }
};

const create = async (data) => {
    try {
        const requiredFields = [
            data.product_price,
            data.product_name,
            data.product_colors,
            data.product_category,
            data.product_brand,
        ];
        const nullFields = [];

        requiredFields.map((iten) => {
            if (iten == null) {
                return nullFields.push(iten);
            }
        });

        if (nullFields.length > 0) {
            throw new Error(
                `Alguns campos obrigatórios não foram preenchidos. Os campos: ${nullFields.toString()}`
            );
        }

        const line = await DB.execute(
            `INSERT INTO ${table} (product_image, product_discount, product_price, product_sizes, product_name, product_colors, product_status, product_condition, product_category, product_brand, product_description) VALUES ('${data.product_image}', ${data.product_discount}, ${data.product_price}, '${data.product_sizes}', '${data.product_name}', '${data.product_colors}', ${data.product_status}, ${data.product_condition}, ${data.product_category}, ${data.product_brand}, '${data.product_description}');`
        );

        return await listOne(line.insertId)
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
            status: 400
        };
    }
};

module.exports = {
    listAll,
    listOne,
    create
};
