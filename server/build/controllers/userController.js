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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer")); // Importar Nodemailer
class UserController {
    // Obtener todos los usuarios
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query("SELECT * FROM tb_usuarios");
            resp.json(users);
        });
    }
    // Obtener todos los psicólogos (usuarios con id_rol = 2)
    getPsychologists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const psychologists = yield database_1.default.query('SELECT id_usuario, nombre, e_mail FROM tb_usuarios WHERE id_rol = 2');
            console.log(psychologists); // Verifica que los psicólogos estén siendo enviados
            res.json(psychologists);
        });
    }
    // // Obtener todos los psicólogos (usuarios con id_rol = 2)
    // public async getPsychologistssendemail(req: Request, res: Response): Promise<void> {
    //   try {
    //   const psychologists = await pool.query('SELECT id_usuario, nombre, e_mail FROM tb_usuarios WHERE id_rol = 2');
    //   console.log(psychologists); // Verifica que los psicólogos estén siendo enviados
    //   res.json(psychologists);
    //   // Configuración de Nodemailer
    //   const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: "psicoaguilassoporte@gmail.com",
    //         pass: "ilhj qwju tiij vbby",
    //     },
    //   });
    //   // Enviar correo a cada psicólogo
    //   const promesasEnvio = psychologists.map((psychologists: any) => {
    //   const mailOptions = {
    //       from: "psicoaguilassoporte@gmail.com",
    //       to: psychologists.e_mail,
    //       subject: "Nueva Conferencia Programada",
    //       text: "Se ha programado una nueva conferencia. Por favor, revisa los detalles.",
    //   };
    //   return transporter.sendMail(mailOptions);
    //    });
    //    // Esperar todos los envíos
    //    await Promise.all(promesasEnvio);
    //    res.json({ message: "Correos enviados exitosamente." });
    //   } catch (error) {
    //     console.error("Error al enviar correos:", error);
    //     res.status(500).json({ message: "Error interno al enviar correos." });
    // }
    // }
    // // Obtener todos los psicólogos (usuarios con id_rol = 2) y enviar correos
    // public async getPsychologistsAndSendEmail(req: Request, res: Response): Promise<void> {
    //   try {
    //     // Obtener psicólogos desde la base de datos
    //     const result = await pool.query('SELECT id_usuario, nombre, e_mail FROM tb_usuarios WHERE id_rol = 2');
    //     const psychologists = result.rows; // Asegúrate de acceder correctamente a los resultados de la consulta
    //     console.log(psychologists); // Verifica que los psicólogos estén siendo enviados
    //     // Configuración de Nodemailer
    //     const transporter = nodemailer.createTransport({
    //       service: "gmail",
    //       auth: {
    //         user: "psicoaguilassoporte@gmail.com",
    //         pass: "ilhjqwuitiijvbby", // Asegúrate de no dejar espacios o caracteres incorrectos
    //       },
    //     });
    //     // Enviar correo a cada psicólogo
    //     const promisesEnvio = psychologists.map((psychologist: any) => {
    //       const mailOptions = {
    //         from: "psicoaguilassoporte@gmail.com",
    //         to: psychologist.e_mail,
    //         subject: "Nueva Conferencia Programada",
    //         text: "Se ha programado una nueva conferencia. Por favor, revisa los detalles.",
    //       };
    //       // Enviar el correo y devolver la promesa
    //       return transporter.sendMail(mailOptions);
    //     });
    //     // Esperar todos los envíos de correo
    //     await Promise.all(promisesEnvio);
    //     // Responder al cliente con un mensaje de éxito
    //     res.json({ message: "Correos enviados exitosamente." });
    //   } catch (error) {
    //     console.error("Error al enviar correos:", error);
    //     res.status(500).json({ message: "Error interno al enviar correos." });
    //   }
    // }
    getPsychologistsAndSendEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Ejecutar consulta y validar estructura
                const result = yield database_1.default.query('SELECT id_usuario, nombre, e_mail FROM tb_usuarios WHERE id_rol = 2');
                const psychologists = Array.isArray(result) ? result : result[0]; // Ajustar según el formato real
                console.log(psychologists); // Verifica el resultado
                if (!psychologists || psychologists.length === 0) {
                    res.status(404).json({ message: "No se encontraron psicólogos." });
                }
                // Configuración de Nodemailer
                const transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: "psicoaguilassoporte@gmail.com",
                        pass: "yqxg asgq kiin rojl", // Asegúrate de usar una contraseña válida
                    },
                });
                // Crear promesas de envío
                const promisesEnvio = psychologists.map((psychologist) => {
                    const mailOptions = {
                        from: "psicoaguilassoporte@gmail.com",
                        to: psychologist.e_mail,
                        subject: "Nueva Conferencia Programada",
                        text: "Se ha solicitado una nueva conferencia. Por favor, revisa los detalles.",
                    };
                    return transporter.sendMail(mailOptions);
                });
                // Esperar todos los envíos
                yield Promise.all(promisesEnvio);
                res.json({ message: "Correos enviados exitosamente." });
            }
            catch (error) {
                console.error("Error al enviar correos:", error);
                res.status(500).json({ message: "Error interno al enviar correos." });
            }
        });
    }
    // Obtener un usuario por su ID
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            const users = yield database_1.default.query("SELECT * FROM tb_usuarios WHERE id_usuario = ?", [id_usuario]);
            if (users.length > 0) {
                res.json(users[0]);
            }
            else {
                res.status(404).json({ text: "The user doesn't exist" });
            }
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, e_mail, nombre, ape_paterno, ape_materno, telefono, grupo, id_carrera, id_rol, imagen_url, } = req.body;
                // Verificar si el correo electrónico ya está registrado
                const existingUser = yield database_1.default.query("SELECT * FROM tb_usuarios WHERE e_mail = ?", [e_mail]);
                if (existingUser.length > 0) {
                    resp.status(400).json({ message: "Email already exists" });
                }
                // Generar el hash de la contraseña usando bcrypt
                const saltRounds = 10;
                const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
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
                yield database_1.default.query("INSERT INTO tb_usuarios SET ?", [newUser]);
                // Configuración de Nodemailer
                const transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: "psicoaguilassoporte@gmail.com", // Tu correo
                        pass: "yqxg asgq kiin rojl", // Usa la contraseña de aplicación aquí
                    },
                });
                // Opciones del correo
                const mailOptions = {
                    from: "psicoaguilassoporte@gmail.com", // Tu correo
                    to: e_mail, // Correo del nuevo usuario
                    subject: "Registro Exitoso",
                    text: `Hola ${nombre},\n\nGracias por registrarte. Tu contraseña es: ${password}\n\nSaludos, Equipo de Soporte`,
                };
                // Enviar el correo
                yield transporter.sendMail(mailOptions);
                resp.json({ message: "User created and email sent" });
            }
            catch (error) {
                console.error("Error al crear usuario:", error);
                resp.status(500).json({ message: "Error al crear el usuario" });
            }
        });
    }
    // Actualizar un usuario
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            yield database_1.default.query("UPDATE tb_usuarios SET ? WHERE id_usuario = ?", [
                req.body,
                id_usuario,
            ]);
            res.json({ message: "User updated" });
        });
    }
    // Eliminar un usuario
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_usuario } = req.params;
            yield database_1.default.query("DELETE FROM tb_usuarios WHERE id_usuario = ?", [
                id_usuario,
            ]);
            res.json({ message: "User deleted" });
        });
    }
    // Obtener todas las carreras
    getCarreras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carreras = yield database_1.default.query("SELECT * FROM tb_carreras");
                res.json(carreras);
            }
            catch (error) {
                console.error("Error al obtener carreras:", error);
                res.status(500).json({ message: "Error al obtener las carreras" });
            }
        });
    }
    // Obtener todos los roles
    getRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield database_1.default.query("SELECT * FROM tb_roles");
                res.json(roles);
            }
            catch (error) {
                console.error("Error al obtener roles:", error);
                res.status(500).json({ message: "Error al obtener los roles" });
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
