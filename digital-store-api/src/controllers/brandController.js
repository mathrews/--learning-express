const DB = require("../database/index");
const table = "brands";

async function listAll() {
    return await DB.execute(`SELECT * FROM ${table}`);
}

async function listOne(id) {
    return await DB.execute(`SELECT * FROM ${table} WHERE brand_id = ${id}`);
}

async function create(data) {
    try {
        if (!data.brand_name) {
            throw new Error("Brand_name é um campo obrigatório");
        }

        const line = await DB.execute(
            `INSERT INTO ${table} (brand_name) VALUES ('${data.brand_name}');`
        );
        return {
            type: "Success",
            data: await listOne(line.insertId),
        };
    } catch (error) {
        return {
            type: "Error",
            message: error,
        };
    }
}

async function update(id, data) {
    try {
        if (!data.brand_name) {
            throw new Error("Brand_name é um campo obrigatório");
        }

        if (data.brand_status) {
            await DB.execute(
                `UPDATE ${table} SET brand_name = '${data.brand_name}', brand_status = ${data.brand_status} WHERE brand_id = ${id};`
            );
        } else {
            await DB.execute(
                `UPDATE ${table} SET brand_name = '${data.brand_name}' WHERE brand_id = ${id};`
            );
        }

        return {
            type: "Success",
            data: await listOne(id),
        };
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
        };
    }
}

async function deletar(id) {
    try {
        const line = await DB.execute(
            `DELETE FROM ${table} WHERE brand_id = ${id};`
        );
        return {
            type: "Success",
            message:
                line.affectedRows != 0
                    ? "Excluido com sucesso"
                    : "Id não encontrado",
        };
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
        };
    }
}

module.exports = {
    listAll,
    listOne,
    create,
    update,
    deletar,
};
