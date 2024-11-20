import { Request, Response } from "express";
import pool from "../database";
import nodemailer from "nodemailer"; 
class CitasController {
  public async list(req: Request, res: Response) {
    const citas = await pool.query(`
            SELECT c.*, p.nombre AS psicologo, a.nombre AS alumno
            FROM tb_citas c
            JOIN tb_usuarios p ON c.id_psicologo = p.id_usuario
            JOIN tb_usuarios a ON c.id_alumno = a.id_usuario
        `);
    res.json(citas);
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const cita = await pool.query("SELECT * FROM tb_citas WHERE id_cita = ?", [
      id,
    ]);
    if (cita.length > 0) {
      return res.json(cita[0]);
    }
    res.status(404).json({ message: "Cita no encontrada" });
  }

  public async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { estatus } = req.body;

      console.log("ID recibido:", id);
      console.log("Estatus recibido:", estatus);

      if (
        !estatus ||
        !["Pendiente", "Aceptada", "Rechazada"].includes(estatus)
      ) {
        console.log("Estatus inválido:", estatus);
        res
          .status(400)
          .json({ message: "Estatus no válido o no proporcionado." });
        return;
      }

      // Paso 1: Obtener el correo asociado
      let cita;
      try {
        [cita] = await pool.query(
          "SELECT correo FROM tb_citas WHERE id_cita = ?",
          [id]
        );
      } catch (error) {
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
      const updateResult: any = await pool.query(
        "UPDATE tb_citas SET estatus = ? WHERE id_cita = ?",
        [estatus, id]
      );

      if (updateResult.affectedRows > 0) {
        const transporter = nodemailer.createTransport({
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
          const info = await transporter.sendMail(mailOptions);
          console.log("Correo enviado:", info.response);
          res.json({
            message: "Estatus actualizado y correo enviado correctamente.",
          });
        } catch (emailError) {
          console.error("Error al enviar el correo:", emailError);
          res.status(500).json({
            message: "Estatus actualizado, pero falló el envío del correo.",
          });
        }
      } else {
        console.log("No se pudo actualizar el estatus para ID:", id);
        res.status(404).json({ message: "No se pudo actualizar el estatus." });
      }
    } catch (error) {
      console.error("Error en updateStatus:", error);
      res.status(500).json({ message: "Error al actualizar el estatus." });
    }
  }

  //CREACION DE CITA
  public async create(req: Request, res: Response): Promise<void> {
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
      const result = await pool.query(
        `INSERT INTO tb_citas (id_psicologo, id_alumno, id_consultorio, id_horario, motivo, estatus, correo) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id_psicologo, id_alumno, id_consultorio, id_horario, motivo, estatus, correo]
      );
  
      // Verificar que la cita fue insertada correctamente
      if (result.affectedRows > 0) {
        res.status(201).json({ message: "Cita creada exitosamente." });
      } else {
        res.status(500).json({ message: "Error al crear la cita." });
      }
    } catch (error) {
      console.error("Error en create:", error);
      res.status(500).json({ message: "Error interno al crear la cita." });
    }
  }

  public async getByPsicologo(req: Request, res: Response): Promise<void> {
    try {
        const { id_psicologo } = req.params;
        const citas = await pool.query(`
            SELECT c.*, p.nombre AS psicologo, a.nombre AS alumno
            FROM tb_citas c
            JOIN tb_usuarios p ON c.id_psicologo = p.id_usuario
            JOIN tb_usuarios a ON c.id_alumno = a.id_usuario
            WHERE c.id_psicologo = ?`, [id_psicologo]);
        res.json(citas);
    } catch (error) {
        console.error("Error en getByPsicologo:", error);
        res.status(500).json({ message: "Error al obtener citas por psicólogo." });
    }
}

public async getByAlumno(req: Request, res: Response): Promise<void> {
    try {
        const { id_alumno } = req.params;
        const citas = await pool.query(`
            SELECT c.*, p.nombre AS psicologo, a.nombre AS alumno
            FROM tb_citas c
            JOIN tb_usuarios p ON c.id_psicologo = p.id_usuario
            JOIN tb_usuarios a ON c.id_alumno = a.id_usuario
            WHERE c.id_alumno = ?`, [id_alumno]);
        res.json(citas);
    } catch (error) {
        console.error("Error en getByAlumno:", error);
        res.status(500).json({ message: "Error al obtener citas por alumno." });
    }
}

  
}

const citasController = new CitasController();
export default citasController;
