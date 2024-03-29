const DB = require("../database/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const table = "users";

const listAll = async () => {
    try {
        return await DB.execute(
            `SELECT user_id, user_name, user_email, user_level FROM ${table};`
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

        const [emailExiste] = await DB.execute(
            `SELECT * FROM ${table} WHERE user_email = '${data.user_email}';`
        );
        if (emailExiste) {
            return {
                type: "warn",
                message: "Este usuário já existe!",
            };
        }

        bcrypt.hash(data.user_password, 10, async (error, hash) => {
            if (error) {
                throw new Error(error.message);
            }

            console.log(hash);

            console.log(data.user_level);
            if (data.user_level == undefined) {
                return {
                    type: "error",
                    message: "User_level undefined",
                };
            } else {
                await DB.execute(
                    `INSERT INTO ${table} (user_name, user_email, user_password, user_level) VALUES ('${data.user_name}', '${data.user_email}', '${hash}', ${data.user_level});`
                );
            }
        });

        return {
            type: "success",
            message: "Usuário criado com sucesso",
        };
    } catch (error) {
        return {
            type: "error",
            message: error.message,
        };
    }
};

const destroy = async (id) => {
    try {
        await DB.execute(`DELETE FROM ${table} WHERE user_id = ${id};`);

        return {
            type: "success",
            message: "Usuário deletado!",
        };
    } catch (error) {
        return {
            type: "error",
            message: error.message,
        };
    }
};

const editUser = async (id, data) => {
    try {
        if (data.user_name) {
            await DB.execute(
                `UPDATE ${table} SET user_name = '${data.user_name}' WHERE user_id = ${id};`
            );
        }
        if (data.user_email) {
            const [emailExiste] = await DB.execute(
                `SELECT * FROM ${table} WHERE user_email = '${data.user_email}';`
            );
            if (emailExiste) {
                return {
                    type: "warn",
                    message: "Este usuário já existe!",
                };
            } else {
                await DB.execute(
                    `UPDATE ${table} SET user_email = '${data.user_email}' WHERE user_id = ${id};`
                );
            }
        }
        if (data.user_password) {
            await DB.execute(
                `UPDATE ${table} SET user_password = '${data.user_password}' WHERE user_id = ${id};`
            );
        }
        if (data.user_level) {
            await DB.execute(
                `UPDATE ${table} SET user_level = ${data.user_level} WHERE user_id = ${id};`
            );
        }
        return {
            type: "success",
            message: "Usuario modificado com sucesso",
        };
    } catch (error) {
        return {
            type: "error",
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
    destroy,
    editUser,
};
