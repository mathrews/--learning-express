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

        requiredFields.map((iten, index) => {
            if (iten == null) {
                switch (index) {
                    case 0:
                        nullFields.push("product_price");
                        break;
                    case 1:
                        nullFields.push("product_name");
                        break;
                    case 2:
                        nullFields.push("product_colors");
                        break;
                    case 3:
                        nullFields.push("product_category");
                        break;
                    case 4:
                        nullFields.push("product_brand");
                        break;
                }
                return nullFields;
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

        return await listOne(line.insertId);
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
            status: 400,
        };
    }
};

const update = async (id, data) => {
    try {
        if (data) {
            switch (data) {
                case data.product_image:
                    await DB.execute(
                        `UPDATE ${table} SET product_image = '${data.product_image}' WHERE product_id = ${id};`
                    );
                    break;
                case data.product_discount:
                    await DB.execute(
                        `UPDATE ${table} SET product_discount = ${data.product_discount} WHERE product_id = ${id};`
                    );
                    break;
                case data.product_price:
                    await DB.execute(
                        `UPDATE ${table} SET product_price = ${data.product_price} WHERE product_id = ${id};`
                    );
                    break;
                case data.product_sizes:
                    await DB.execute(
                        `UPDATE ${table} SET product_sizes = '${data.product_sizes}' WHERE product_id = ${id};`
                    );
                case data.product_name:
                    await DB.execute(
                        `UPDATE ${table} SET product_name = '${data.product_name}' WHERE product_id = ${id};`
                    );
                    break;
                case data.product_colors:
                    await DB.execute(
                        `UPDATE ${table} SET product_colors = '${data.product_colors}' WHERE product_id = ${id};`
                    );
                    break;
                case data.product_status:
                    await DB.execute(
                        `UPDATE ${table} SET product_status = ${data.product_status} WHERE product_id = ${id};`
                    );
                    break;
                case data.product_condition:
                    await DB.execute(
                        `UPDATE ${table} SET product_condition = ${data.product_condition} WHERE product_id = ${id};`
                    );
                    break;
                case data.product_category:
                    await DB.execute(
                        `UPDATE ${table} SET product_category = ${data.product_category} WHERE product_id = ${id};`
                    );
                    break;
                case data.product_brand:
                    await DB.execute(
                        `UPDATE ${table} SET product_brand = ${data.product_brand} WHERE product_id = ${id};`
                    );
                    break;
                case data.product_description:
                    await DB.execute(
                        `UPDATE ${table} SET product_description = '${data.product_description}' WHERE product_id = ${id};`
                    );
                    break;
            }
        }

        return await listOne(id);
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
            status: 400,
        };
    }
};

module.exports = {
    listAll,
    listOne,
    create,
    update,
};
