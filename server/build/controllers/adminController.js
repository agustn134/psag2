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
class AdminController {
    // public index(req: Request, res: Response) {
    // 	res.send('Login');
    // 	pool.query('DESCRIBE tb_usuarios');
    // 	res.json('tb_usuarios');
    // }
    // public async list(req: Request, resp: Response): Promise<void> {
    // 	const users = await pool.query('SELECT * FROM tb_usuarios');
    // 	resp.json(users);
    // }
    // public async getOne(req: Request, resp: Response): Promise<any> {
    // 	const { id_usuario } = req.params;
    // 	const users = await pool.query(`
    // 		 SELECT u.id_usuario, u.nombre, u.ape_paterno, u.ape_materno, u.e_mail, u.telefono, u.grupo, u.id_carrera, u.imagen_url
    //     FROM tb_usuarios u  WHERE u.id_usuario = ?`, [id_usuario]);
    // 	if (users.length > 0) {
    // 		return resp.json(users[0]); 
    // 	}
    // 	resp.status(404).json({ text: 'The user doesn\'t exist' });
    // 	console.log(users);
    // }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener la contraseña y el correo electrónico del cuerpo de la solicitud
                const { password, e_mail, nombre, ape_paterno, ape_materno, telefono, grupo, id_carrera, id_rol, imagen_url } = req.body;
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
                    id_rol,
                    imagen_url
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
}
const adminController = new AdminController();
exports.default = adminController;
