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
const nodemailer_1 = __importDefault(require("nodemailer"));
class CitasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const citas = yield database_1.default.query(`
            SELECT c.*, p.nombre AS psicologo, a.nombre AS alumno
            FROM tb_citas c
            JOIN tb_usuarios p ON c.id_psicologo = p.id_usuario
            JOIN tb_usuarios a ON c.id_alumno = a.id_usuario
        `);
            res.json(citas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cita = yield database_1.default.query("SELECT * FROM tb_citas WHERE id_cita = ?", [
                id,
            ]);
            if (cita.length > 0) {
                return res.json(cita[0]);
            }
            res.status(404).json({ message: "Cita no encontrada" });
        });
    }
    updateStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { estatus } = req.body;
                console.log("ID recibido:", id);
                console.log("Estatus recibido:", estatus);
                if (!estatus ||
                    !["Pendiente", "Aceptada", "Rechazada"].includes(estatus)) {
                    console.log("Estatus inválido:", estatus);
                    res
                        .status(400)
                        .json({ message: "Estatus no válido o no proporcionado." });
                    return;
                }
                // Paso 1: Obtener el correo asociado
                let cita;
                try {
                    [cita] = yield database_1.default.query("SELECT correo FROM tb_citas WHERE id_cita = ?", [id]);
                }
                catch (error) {
                    console.error("Error al ejecutar la consulta:", error);
                    res
                        .status(500)
                        .json({ message: "Error al consultar la base de datos." });
                    return;
                }
                if (!cita || cita.length === 0) {
                    console.log("No se encontró la cita con el ID:", id);
                    res
                        .status(404)
                        .json({ message: "No se encontró la cita con el ID proporcionado." });
                    return;
                }
                const correo = cita.correo;
                if (!correo) {
                    console.log("El correo asociado no está definido.");
                    res.status(404).json({ message: "Correo no definido para la cita." });
                    return;
                }
                console.log("Correo obtenido:", correo);
                // Paso 2: Actualizar el estatus en la base de datos
                const updateResult = yield database_1.default.query("UPDATE tb_citas SET estatus = ? WHERE id_cita = ?", [estatus, id]);
                if (updateResult.affectedRows > 0) {
                    const transporter = nodemailer_1.default.createTransport({
                        service: "gmail",
                        auth: {
                            user: "psicoaguilassoporte@gmail.com",
                            pass: "ilhj qwju tiij vbby",
                        },
                    });
                    const mailOptions = {
                        from: "psicoaguilassoporte@gmail.com",
                        to: correo,
                        subject: "Actualización de estatus de tu cita",
                        text: `El estatus de tu cita ha sido actualizado a: ${estatus}.`,
                    };
                    try {
                        const info = yield transporter.sendMail(mailOptions);
                        console.log("Correo enviado:", info.response);
                        res.json({
                            message: "Estatus actualizado y correo enviado correctamente.",
                        });
                    }
                    catch (emailError) {
                        console.error("Error al enviar el correo:", emailError);
                        res.status(500).json({
                            message: "Estatus actualizado, pero falló el envío del correo.",
                        });
                    }
                }
                else {
                    console.log("No se pudo actualizar el estatus para ID:", id);
                    res.status(404).json({ message: "No se pudo actualizar el estatus." });
                }
            }
            catch (error) {
                console.error("Error en updateStatus:", error);
                res.status(500).json({ message: "Error al actualizar el estatus." });
            }
        });
    }
    //CREACION DE CITA
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_psicologo, id_alumno, id_consultorio, id_horario, motivo, correo } = req.body;
                // Validar que los campos requeridos están presentes
                if (!id_psicologo || !id_alumno || !id_consultorio || !id_horario || !motivo || !correo) {
                    res.status(400).json({ message: "Todos los campos son obligatorios." });
                    return;
                }
                // Por defecto, el estatus será 'Pendiente'
                const estatus = "Pendiente";
                // Insertar la nueva cita en la base de datos
                const result = yield database_1.default.query(`INSERT INTO tb_citas (id_psicologo, id_alumno, id_consultorio, id_horario, motivo, estatus, correo) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`, [id_psicologo, id_alumno, id_consultorio, id_horario, motivo, estatus, correo]);
                // Verificar que la cita fue insertada correctamente
                if (result.affectedRows > 0) {
                    res.status(201).json({ message: "Cita creada exitosamente." });
                }
                else {
                    res.status(500).json({ message: "Error al crear la cita." });
                }
            }
            catch (error) {
                console.error("Error en create:", error);
                res.status(500).json({ message: "Error interno al crear la cita." });
            }
        });
    }
    getByPsicologo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_psicologo } = req.params;
                const citas = yield database_1.default.query(`
            SELECT c.*, p.nombre AS psicologo, a.nombre AS alumno
            FROM tb_citas c
            JOIN tb_usuarios p ON c.id_psicologo = p.id_usuario
            JOIN tb_usuarios a ON c.id_alumno = a.id_usuario
            WHERE c.id_psicologo = ?`, [id_psicologo]);
                res.json(citas);
            }
            catch (error) {
                console.error("Error en getByPsicologo:", error);
                res.status(500).json({ message: "Error al obtener citas por psicólogo." });
            }
        });
    }
    getByAlumno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id_alumno } = req.params;
                const citas = yield database_1.default.query(`
            SELECT c.*, p.nombre AS psicologo, a.nombre AS alumno
            FROM tb_citas c
            JOIN tb_usuarios p ON c.id_psicologo = p.id_usuario
            JOIN tb_usuarios a ON c.id_alumno = a.id_usuario
            WHERE c.id_alumno = ?`, [id_alumno]);
                res.json(citas);
            }
            catch (error) {
                console.error("Error en getByAlumno:", error);
                res.status(500).json({ message: "Error al obtener citas por alumno." });
            }
        });
    }
    //Enviar correos usando Nodemailer
    sendConferenceMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Obtener correos de los psicólogos
                const correos = yield database_1.default.query("SELECT e_mail FROM tb_usuarios WHERE id_rol = 2");
                if (correos.length === 0) {
                    res.status(404).json({ message: "No se encontraron correos de psicólogos." });
                    return;
                }
                // Configuración de Nodemailer
                const transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: "psicoaguilassoporte@gmail.com",
                        pass: "ilhj qwju tiij vbby",
                    },
                });
                // Enviar correo a cada psicólogo
                const promesasEnvio = correos.map((usuario) => {
                    const mailOptions = {
                        from: "psicoaguilassoporte@gmail.com",
                        to: usuario.correo,
                        subject: "Nueva Conferencia Programada",
                        text: "Se ha programado una nueva conferencia. Por favor, revisa los detalles.",
                    };
                    return transporter.sendMail(mailOptions);
                });
                // Esperar todos los envíos
                yield Promise.all(promesasEnvio);
                res.json({ message: "Correos enviados exitosamente." });
            }
            catch (error) {
                console.error("Error al enviar correos:", error);
                res.status(500).json({ message: "Error interno al enviar correos." });
            }
        });
    }
    getEmailsByRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emails = yield database_1.default.query("SELECT e_mail, id_usuario, id_rol, nombre FROM tb_usuarios WHERE id_rol = 2");
                if (emails.length > 0) {
                    res.json(emails);
                }
                else {
                    res.status(404).json({ message: "No se encontraron correos con id_rol = 2." });
                }
            }
            catch (error) {
                console.error("Error en getEmailsByRole:", error);
                res.status(500).json({ message: "Error al obtener los correos." });
            }
        });
    }
}
const citasController = new CitasController();
exports.default = citasController;
