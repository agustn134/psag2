"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = __importDefault(require("../keys"));
class LoginController {
    index(req, res) {
        res.send('Login');
        database_1.default.query('DESCRIBE tb_usuarios');
        res.json('tb_usuarios');
    }
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query('SELECT * FROM tb_usuarios');
            resp.json(users);
        });
    }
    getOne(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            const users = yield database_1.default.query(`
			 SELECT u.id_usuario, u.nombre, u.ape_paterno, u.ape_materno, u.e_mail, u.telefono, u.grupo, u.id_carrera, u.imagen_url
        FROM tb_usuarios u  WHERE u.id_usuario = ?`, [id_usuario]);
            if (users.length > 0) {
                return resp.json(users[0]);
            }
            resp.status(404).json({ text: 'The user doesn\'t exist' });
            console.log(users);
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener la contraseña y el correo electrónico del cuerpo de la solicitud
                const { password, e_mail, nombre, ape_paterno, ape_materno, telefono, grupo, id_carrera, id_rol } = req.body;
                // Verificar si el correo electrónico ya está registrado
                const existingUser = yield database_1.default.query('SELECT * FROM tb_usuarios WHERE e_mail = ?', [e_mail]);
                if (existingUser.length > 0) {
                    resp.status(400).json({ message: 'Email already exists' });
                }
                // Generar el hash de la contraseña usando bcrypt
                const saltRounds = 10;
                const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
                const existingCarrera = yield database_1.default.query("SELECT * FROM tb_carreras WHERE id_carrera = ?", [id_carrera]);
                if (existingCarrera.length === 0) {
                    resp
                        .status(400)
                        .json({ message: "La carrera especificada no existe" });
                }
                // Crear el nuevo usuario con todos los campos incluyendo el correo y la contraseña
                const newUser = {
                    nombre,
                    ape_paterno,
                    ape_materno,
                    e_mail,
                    password: hashedPassword,
                    telefono,
                    grupo,
                    id_carrera,
                    // id_rol,
                    imagen_url: '',
                };
                // Insertar el nuevo usuario en la base de datos
                yield database_1.default.query('INSERT INTO tb_usuarios SET ?', [newUser]);
                console.log(newUser);
                resp.json({ message: 'User Saved' });
            }
            catch (error) {
                console.error('Error al crear usuario:', error);
                resp.status(500).json({ message: 'Error al crear el usuario' });
            }
        });
    }
    put(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extraer el ID del usuario de los parámetros de la solicitud
            const { id_usuario } = req.params;
            // Actualizar los datos del usuario en la base de datos utilizando el ID
            // Se utiliza un placeholder (?) para prevenir inyecciones SQL
            // 'req.body' contiene los nuevos datos del usuario que se van a actualizar
            yield database_1.default.query('UPDATE tb_usuarios SET ? WHERE id_usuario = ?', [req.body, id_usuario]);
            // Enviar una respuesta indicando que la actualización fue exitosa
            resp.json({ message: 'Update success' });
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extraer el ID del usuario de los parámetros de la solicitud
            const { id_usuario } = req.params;
            // Eliminar el usuario de la base de datos utilizando el ID
            // Se usa un placeholder (?) para prevenir inyecciones SQL
            yield database_1.default.query('DELETE FROM tb_usuarios WHERE id_usuario = ?', [id_usuario]);
            // Enviar una respuesta indicando que el usuario ha sido eliminado
            resp.json({ message: 'User deleted' });
        });
    }
    login(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { e_mail, password } = req.body;
            try {
                // Buscar el usuario en la base de datos utilizando el correo electrónico proporcionado
                const result = yield database_1.default.query('SELECT * FROM tb_usuarios WHERE e_mail = ?', [e_mail]);
                // Verificar si se encontró algún usuario con el correo electrónico proporcionado
                if (result.length === 0) {
                    resp.status(404).json({ message: 'No se encontró algún usuario con el correo electrónico proporcionado' }); // Cambié el código de estado a 404
                    return;
                }
                const user = result[0];
                // Comparar la contraseña proporcionada por el usuario con la contraseña cifrada almacenada
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isMatch) {
                    resp.status(401).json({ message: 'Incorrect password' }); // Cambié el código de estado a 401
                    return;
                }
                // Generar un token JWT para el usuario
                const token = jsonwebtoken_1.default.sign({ id: user.id_usuario, rol: user.id_rol }, keys_1.default.jwtSecret, { expiresIn: '5h' });
                // Enviar el token y un mensaje de éxito como respuesta
                resp.json({ token, message: 'Login successful' });
            }
            catch (error) {
                console.error('Error en el login:', error);
                resp.status(500).json({ message: 'Error en el servidor' }); // Cambié el código de estado a 500
            }
        });
    }
}
const loginController = new LoginController();
exports.default = loginController;
