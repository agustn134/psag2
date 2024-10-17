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
const nodemailer_1 = __importDefault(require("nodemailer")); // Importar Nodemailer
class UserController {
    // Obtener todos los usuarios
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query('SELECT * FROM tb_usuarios');
            resp.json(users);
        });
    }
    // Obtener un usuario por su ID
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            const users = yield database_1.default.query('SELECT * FROM tb_usuarios WHERE id_usuario = ?', [id_usuario]);
            if (users.length > 0) {
                res.json(users[0]);
            }
            else {
                res.status(404).json({ text: "The user doesn't exist" });
            }
        });
    }
    // Crear un nuevo usuario
    // public async create(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { password, e_mail } = req.body;
    //         const existingUser = await pool.query('SELECT * FROM tb_usuarios WHERE e_mail = ?', [e_mail]);
    //         if (existingUser.length > 0) {
    //              res.status(400).json({ message: 'Email already exists' });
    //         }
    //         const saltRounds = 10;
    //         const hashedPassword = await bcrypt.hash(password, saltRounds);
    //         const newUser = {
    //             ...req.body,
    //             password: hashedPassword
    //         };
    //         await pool.query('INSERT INTO tb_usuarios SET ?', [newUser]);
    //         res.json({ message: 'User created' });
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error creating user' });
    //     }
    // }
    // public async create(req: Request, resp: Response): Promise<void> {
    // 	try {
    // 		// Obtener la contraseña y el correo electrónico del cuerpo de la solicitud
    // 		const { password, e_mail, nombre, ape_paterno, ape_materno, telefono, grupo, id_carrera, id_rol } = req.body;
    // 		// Verificar si el correo electrónico ya está registrado
    // 		const existingUser = await pool.query('SELECT * FROM tb_usuarios WHERE e_mail = ?', [e_mail]);
    // 		if (existingUser.length > 0) {
    // 			resp.status(400).json({ message: 'Email already exists' });
    // 		}
    // 		// Generar el hash de la contraseña usando bcrypt
    // 		const saltRounds = 10;
    // 		const hashedPassword = await bcrypt.hash(password, saltRounds);
    // 		const existingCarrera = await pool.query(
    //           "SELECT * FROM tb_carreras WHERE id_carrera = ?",
    //           [id_carrera]
    //         );
    //         if (existingCarrera.length === 0) {
    //           resp
    //             .status(400)
    //             .json({ message: "La carrera especificada no existe" });
    //         }
    // 		// Crear el nuevo usuario con todos los campos incluyendo el correo y la contraseña
    // 		const newUser = {
    // 			nombre,
    // 			ape_paterno,
    // 			ape_materno,
    // 			e_mail, 
    // 			password: hashedPassword,
    // 			telefono,
    // 			grupo,
    // 			id_carrera,
    // 			id_rol,
    // 			imagen_url: '',
    // 		};
    // 		// Insertar el nuevo usuario en la base de datos
    // 		await pool.query('INSERT INTO tb_usuarios SET ?', [newUser]);
    // 		console.log(newUser); 
    // 		resp.json({ message: 'User Saved' });
    // 	} catch (error) {
    // 		console.error('Error al crear usuario:', error);
    // 		resp.status(500).json({ message: 'Error al crear el usuario' });
    // 	}
    // }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                    resp.status(400).json({ message: "La carrera especificada no existe" });
                }
                // Crear el nuevo usuario
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
                    imagen_url,
                };
                // Insertar el nuevo usuario en la base de datos
                yield database_1.default.query('INSERT INTO tb_usuarios SET ?', [newUser]);
                // Configuración de Nodemailer
                const transporter = nodemailer_1.default.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'psicoaguilassoporte@gmail.com', // Tu correo
                        pass: 'yqxg asgq kiin rojl' // Usa la contraseña de aplicación aquí
                    },
                });
                // Opciones del correo
                const mailOptions = {
                    from: 'psicoaguilassoporte@gmail.com', // Tu correo
                    to: e_mail, // Correo del nuevo usuario
                    subject: 'Registro Exitoso',
                    text: `Hola ${nombre},\n\nGracias por registrarte. Tu contraseña es: ${password}\n\nSaludos, Equipo de Soporte`
                };
                // Enviar el correo
                yield transporter.sendMail(mailOptions);
                resp.json({ message: 'User created and email sent' });
            }
            catch (error) {
                console.error('Error al crear usuario:', error);
                resp.status(500).json({ message: 'Error al crear el usuario' });
            }
        });
    }
    // Actualizar un usuario
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            yield database_1.default.query('UPDATE tb_usuarios SET ? WHERE id_usuario = ?', [req.body, id_usuario]);
            res.json({ message: 'User updated' });
        });
    }
    // Eliminar un usuario
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            yield database_1.default.query('DELETE FROM tb_usuarios WHERE id_usuario = ?', [id_usuario]);
            res.json({ message: 'User deleted' });
        });
    }
}
const userController = new UserController();
exports.default = userController;
