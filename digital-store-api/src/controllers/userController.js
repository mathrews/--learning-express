const DB = require("../database/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const table = "users";

const listAll = async () => {
    try {
        return await DB.execute(
            `SELECT user_id, user_name, user_email FROM ${table};`
        );
    } catch (error) {
        return console.log(error.message);
    }
};

const create = async (data) => {
    try {
        if (!data.user_name || !data.user_email || !data.user_password) {
            throw new Error("Dados incompletos.");
        }

        const [emailExiste] = await DB.execute(`SELET * FROM ${table} WHERE user_email = ${data.user_email};`);
        if (emailExiste) {
            return {
                type: 'warning',
                message: 'Este usuário já existe!'
            }
        }

        bcrypt.hash(data.user_password, 10, async (error, hash) => {
            if (error) {
                throw new Error(error.message);
            }

            console.log(hash)
            await DB.execute(
                `INSERT INTO ${table} (user_name, user_email, user_password, user_level) VALUES ('${data.user_name}', '${data.user_email}', '${hash}', ${data.user_level});`
            );
        });
        
        return {
            type: "success",
            message: "Usuário criado com sucesso",
        };
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
        };
    }
};

const login = async (data) => {
    try {
        if (!data.user_email || !data.user_password) {
            throw new Error("Email e Senha são obrigatórios");
        }
        const result = await DB.execute(
            `SELECT * FROM ${table} WHERE user_email = '${data.user_email}' AND user_password = '${data.user_password}';`
        );

        if (result.length === 0) {
            return {
                type: "warning",
                message: "Email ou senha incorretor",
            };
        }

        const token = jwt.sign(
            { user_id: result[0].user_id },
            "digital-store-api",
            {
                expiresIn: "1h",
            }
        );
        await DB.execute(
            `UPDATE ${table} SET token = '${token}' WHERE user_id = ${result[0].user_id};`
        );

        return {
            type: "Success",
            token,
        };
    } catch (error) {
        return {
            type: "Error",
            message: error.message,
        };
    }
};

const checkToken = async (token) => {
    return await DB.execute(`SELECT * FROM ${table} WHERE TOKEN = '${token}'`);
};

module.exports = {
    listAll,
    login,
    checkToken,
    create,
};
