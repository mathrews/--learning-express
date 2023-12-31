const table = "brands";
const DB = require("../database/index");
const BrandModel = require("../models/brandModel");

async function listAll() {
    await DB.sync();
    return await BrandModel.findAll();
}

async function listOne(id) {
    await DB.sync();
    return await BrandModel.findByPk(id);
}

async function create(data) {
    try {
        if (!data.brand_name) {
            throw new Error("Brand_name é um campo obrigatório");
        }

        const line = await BrandModel.create({
            brand_name: data.brand_name,
            brand_status: data.brand_status,
        });

        return {
            type: "Success",
            data: line,
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
            // await DB.execute(
            //     `UPDATE ${table} SET brand_name = '${data.brand_name}', brand_status = ${data.brand_status} WHERE brand_id = ${id};`
            // );

            const brand = await listOne(id);

            brand.brand_name = data.brand_name;
            brand.brand_status = data.brand_status;

            brand.save();
        } else {
            const brand = await listOne(id);

            brand.brand_name = data.brand_name;
            brand.save();
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
        return {
            type: "Success",
            message:
                (await BrandModel.destroy({
                    where: {
                        brand_id: id,
                    },
                })) >= 1
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
