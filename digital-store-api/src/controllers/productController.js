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
    
}

module.exports = {
    listAll,
    listOne,
};
