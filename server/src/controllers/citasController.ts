// // import { Request, Response } from "express";

// // import pool from '../database';

// // class CitasController {

// //     public async list(req: Request, res: Response){
// //         const citas = await pool.query('SELECT * FROM tb_citas');
// //         res.json(citas);
// //     }

// //     public async getOne(req: Request, res: Response): Promise<any> {
// //         const { id } = req.params;
// //         const cita = await pool.query('SELECT * FROM tb_citas WHERE id_citas = ?', [id]);
// //         if (cita.length > 0) {
// //             return res.json(cita[0]);
// //         }
// //         res.status(404).json({ message: 'cita no encontrado' }); // Mensaje correcto cuando no se encuentra el cita
// //     }

// //     public async create (req: Request, res: Response): Promise<void> {
// //         await pool.query('INSERT INTO tb_citas SET ?', [req.body]);
// //         res.json({ message: 'cita Guardado' });
// //     }
    
// //     public async update (req: Request, res: Response): Promise<void> {
// //        const {id} = req.params;
// //        await pool.query('UPDATE tb_citas SET ? WHERE id_citas = ?', [req.body, id]);
// //        res.json({message: 'cita actualizado'});
// //     }

// //     public async delete(req: Request, res: Response): Promise<any>{
// //         const {id} = req.params;
// //         await pool.query('DELETE FROM tb_citas WHERE id_citas =?', [id]);
// //         res.json({message: 'El cita esta eliminado'})
// //     }
// // }

// // const citasController = new CitasController();
// // export default citasController;
 









// import { Request, Response } from "express";
// import pool from '../database';

// class CitasController {
//     public async list(req: Request, res: Response) {
//         const citas = await pool.query(`
//             SELECT c.*, p.nombre AS psicologo, a.nombre AS alumno
//             FROM tb_citas c
//             JOIN tb_usuarios p ON c.id_psicologo = p.id_usuario
//             JOIN tb_usuarios a ON c.id_alumno = a.id_usuario
//         `);
//         res.json(citas);
//     }

//     public async getOne(req: Request, res: Response): Promise<any> {
//         const { id } = req.params;
//         const cita = await pool.query('SELECT * FROM tb_citas WHERE id_cita = ?', [id]);
//         if (cita.length > 0) {
//             return res.json(cita[0]);
//         }
//         res.status(404).json({ message: 'Cita no encontrada' });
//     }

//     public async create(req: Request, res: Response): Promise<void> {
//         // Verifica que req.body contenga todos los campos necesarios
//         const { id_psicologo, id_alumno, id_consultorio, id_horario, motivo } = req.body;
//         if (!id_psicologo || !id_alumno || !id_consultorio || !id_horario || !motivo) {
//             res.status(400).json({ message: 'Faltan datos necesarios para crear la cita' });
//             return;
//         }

//         // Verificar si ya existe una cita con el mismo id_psicologo e id_horario
//     const existingCita = await pool.query(
//         'SELECT * FROM tb_citas WHERE id_psicologo = ? AND id_horario = ?', 
//         [id_psicologo, id_horario]
//     );

//     if (existingCita.length > 0) {
//         // Si existe, devolver un error
//         res.status(400).json({ message: 'Ya existe una cita para este psicólogo en el mismo horario.' });
//         return;
//     }

//         await pool.query('INSERT INTO tb_citas SET ?', [req.body]);
//         res.json({ message: 'Cita guardada' });
//     }

//     public async update(req: Request, res: Response): Promise<void> {
//         const { id } = req.params;
//         const updatedCita = await pool.query('UPDATE tb_citas SET ? WHERE id_cita = ?', [req.body, id]);

//         if (updatedCita.affectedRows > 0) {
//             res.json({ message: 'Cita actualizada' });
//         } else {
//             res.status(404).json({ message: 'Cita no encontrada' });
//         }
//     }

//     public async delete(req: Request, res: Response): Promise<any> {
//         const { id } = req.params;
//         const result = await pool.query('DELETE FROM tb_citas WHERE id_cita = ?', [id]);

//         if (result.affectedRows > 0) {
//             res.json({ message: 'Cita eliminada' });
//         } else {
//             res.status(404).json({ message: 'Cita no encontrada' });
//         }
//     }
// }

// const citasController = new CitasController();
// export default citasController;





























































































































import { Request, Response } from "express";
import pool from '../database';
import nodemailer from "nodemailer"; // Importar Nodemailer

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
        const cita = await pool.query('SELECT * FROM tb_citas WHERE id_cita = ?', [id]);
        if (cita.length > 0) {
            return res.json(cita[0]);
        }
        res.status(404).json({ message: 'Cita no encontrada' });
    }

//     // Método para actualizar el estatus de la cita y enviar correo al alumno
//     public async updateStatus(req: Request, res: Response): Promise<void> {
//         try {
//             const { id } = req.params; // ID de la cita
//             const { estatus } = req.body; // Nuevo estatus (Pendiente, Aceptada, Rechazada)
    
//             // Validar que se envió un estatus
//             if (!estatus || !['Pendiente', 'Aceptada', 'Rechazada'].includes(estatus)) {
//                 res.status(400).json({ message: 'Estatus no válido o no proporcionado.' });
//                 return;
//             }

//              // Obtener los detalles de la cita y el correo del alumno
//              const [cita] = await pool.query(`

//                 SELECT c.*, u.e_mail
// FROM tb_citas c JOIN tb_usuarios u ON c.id_alumno = u.id_usuario WHERE c.id_cita = ?;
//             `, [id]);



//             if (!cita) {
//                 res.status(404).json({ message: 'Cita no encontrada.' });
//                 return;
//             }

//             const email = u.e_mail; // Correo del alumno
//             const motivo = cita.motivo; // Información adicional (si se necesita)
    

    
//             // Actualizar el estatus en la base de datos
//             const result = await pool.query('UPDATE tb_citas SET estatus = ? WHERE id_cita = ?', [estatus, id]);
    
//             if (result.affectedRows > 0) {
//                 res.json({ message: 'Estatus actualizado correctamente.' });
//                 // Configuración de Nodemailer
//                 const transporter = nodemailer.createTransport({
//                     service: 'gmail',
//                     auth: {
//                         user: 'psicoaguilassoporte@gmail.com', // Tu correo
//                         pass: 'yqxg asgq kiin rojl' // Contraseña de aplicación
//                     },
//                 });
    
//                 // Opciones del correo
//                 const mailOptions = {
//                     from: 'psicoaguilassoporte@gmail.com',
//                     to: email, // Correo del alumno
//                     subject: `Actualización de tu cita: ${estatus}`,
//                     text: `Hola,\n\nTu cita con motivo "${motivo}" ha sido ${estatus.toLowerCase()}.\n\nSaludos,\nEquipo de Soporte`
//                 };
    
//                 // Enviar el correo
//                 await transporter.sendMail(mailOptions);
    
//                 res.json({ message: 'Estatus actualizado y correo enviado correctamente.' });

//             } else {
//                 res.status(404).json({ message: 'Cita no encontrada.' });
//             }
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: 'Error al actualizar el estatus.' });
//         }
//     }





    // // Método para actualizar el estatus de la cita y enviar correo al alumno
    // public async updateStatus(req: Request, res: Response): Promise<void> {
    //     try {
    //         const { id } = req.params;
    //         const { estatus } = req.body;
    
    //         console.log('ID recibido:', id);
    //         console.log('Estatus recibido:', estatus);
    
    //         if (!estatus || !['Pendiente', 'Aceptada', 'Rechazada'].includes(estatus)) {
    //             console.log('Estatus inválido:', estatus);
    //             res.status(400).json({ message: 'Estatus no válido o no proporcionado.' });
    //             return;
    //         }
    
    //         // const [result]: any = await pool.query(`
    //         //     SELECT c.correo
    //         //     FROM tb_citas c
    //         //     WHERE c.id_cita = ?;
    //         // `, [id]);
    
    //         // console.log('Resultado de la consulta:', result);
    
    //         // if (!result || result.length === 0) {
    //         //     console.log('Cita no encontrada con ID:', id);
    //         //     res.status(404).json({ message: 'Cita no encontrada.' });
    //         //     return;
    //         // }
    
    //         // const cita = result[0];
    //         // const correo = cita.correo;
    //         // console.log('Correo encontrado:', correo);
    
    //         const updateResult: any = await pool.query('UPDATE tb_citas SET estatus = ? WHERE id_cita = ?', [estatus, id]);
    //         console.log('Resultado de la actualización:', updateResult);
    
    //         if (updateResult.affectedRows > 0) {
    //             // const transporter = nodemailer.createTransport({
    //             //     service: 'gmail',
    //             //     auth: {
    //             //         user: 'psicoaguilassoporte@gmail.com',
    //             //         pass: 'ilhj qwju tiij vbby',
    //             //     },
    //             // });
    
    //             // const mailOptions = {
    //             //     from: 'psicoaguilassoporte@gmail.com',
    //             //     to: correo,
    //             //     subject: `Actualización de tu cita: ${estatus}`,
    //             //     text: `Hola,\n\nTu cita ha sido ${estatus}.\n\nSaludos,\nEquipo de Soporte`,
    //             // };
    
    //             // await transporter.sendMail(mailOptions);
    //             // console.log('Correo enviado correctamente');
    //             res.json({ message: 'Estatus actualizado y correo enviado correctamente.' });
    //         } else {
    //             console.log('No se pudo actualizar el estatus para ID:', id);
    //             res.status(404).json({ message: 'No se pudo actualizar el estatus.' });
    //         }
    //     } catch (error) {
    //         console.error('Error en updateStatus:', error);
    //         res.status(500).json({ message: 'Error al actualizar el estatus y enviar el correo.' });
    //     }
    // }





//     // Método para actualizar el estatus de la cita y enviar correo al alumno
// public async updateStatus(req: Request, res: Response): Promise<void> {
//     try {
//         const { id } = req.params;
//         const { estatus } = req.body;

//         console.log('ID recibido:', id);
//         console.log('Estatus recibido:', estatus);

//         if (!estatus || !['Pendiente', 'Aceptada', 'Rechazada'].includes(estatus)) {
//             console.log('Estatus inválido:', estatus);
//             res.status(400).json({ message: 'Estatus no válido o no proporcionado.' });
//             return;
//         }

//          // Paso 1: Obtener el correo asociado a la cita
//          const [cita] = await pool.query('SELECT correo FROM tb_citas WHERE id_cita = ?', [id]);
// console.log('Resultado completo de la consulta:', cita);

// if (!cita || cita.length === 0 || !cita[0].correo) {
//     console.log('Correo no encontrado para la cita con ID:', id);
//     res.status(404).json({ message: 'No se encontró la cita o el correo no está registrado.' });
//     return;
// }

// const { correo } = cita[0];
//         console.log('Correo asociado a la cita:', correo);

//         // 2. Actualizar el estatus en la base de datos
//         const updateResult: any = await pool.query('UPDATE tb_citas SET estatus = ? WHERE id_cita = ?', [estatus, id]);
//         console.log('Resultado de la actualización:', updateResult);

//         if (updateResult.affectedRows > 0) {
//             // Configurar nodemailer
//             const transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: 'psicoaguilassoporte@gmail.com', // Reemplaza con tu correo
//                     pass: 'ilhj qwju tiij vbby' // Contraseña generada por Google
//                 }
//             });

//             const mailOptions = {
//                 from: 'psicoaguilassoporte@gmail.com', // Reemplaza con tu correo
//                 to: correo, // Reemplaza con el correo del alumno
//                 subject: 'Actualización de estatus de tu cita',
//                 text: `El estatus de tu cita ha sido actualizado a: ${estatus}.`
//             };

//             try {
//                 const info = await transporter.sendMail(mailOptions);
//                 console.log('Correo enviado:', info.response);
//                 res.json({ message: 'Estatus actualizado y correo enviado correctamente.' });
//             } catch (emailError) {
//                 console.error('Error al enviar el correo:', emailError);
//                 res.status(500).json({ message: 'Estatus actualizado, pero falló el envío del correo.' });
//             }
//         } else {
//             console.log('No se pudo actualizar el estatus para ID:', id);
//             res.status(404).json({ message: 'No se pudo actualizar el estatus.' });
//         }
//     } catch (error) {
//         console.error('Error en updateStatus:', error);
//         res.status(500).json({ message: 'Error al actualizar el estatus.' });
//     }
// }




public async updateStatus(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { estatus } = req.body;

        console.log('ID recibido:', id);
        console.log('Estatus recibido:', estatus);

        if (!estatus || !['Pendiente', 'Aceptada', 'Rechazada'].includes(estatus)) {
            console.log('Estatus inválido:', estatus);
            res.status(400).json({ message: 'Estatus no válido o no proporcionado.' });
            return;
        }

        // Paso 1: Obtener el correo asociado
        let cita;
        try {
            [cita] = await pool.query('SELECT correo FROM tb_citas WHERE id_cita = ?', [id]);
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ message: 'Error al consultar la base de datos.' });
            return;
        }

        if (!cita || cita.length === 0) {
            console.log('No se encontró la cita con el ID:', id);
            res.status(404).json({ message: 'No se encontró la cita con el ID proporcionado.' });
            return;
        }

        const correo = cita.correo;
        if (!correo) {
            console.log('El correo asociado no está definido.');
            res.status(404).json({ message: 'Correo no definido para la cita.' });
            return;
        }

        console.log('Correo obtenido:', correo);

        // Paso 2: Actualizar el estatus en la base de datos
        const updateResult: any = await pool.query('UPDATE tb_citas SET estatus = ? WHERE id_cita = ?', [estatus, id]);

        if (updateResult.affectedRows > 0) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'psicoaguilassoporte@gmail.com',
                    pass: 'ilhj qwju tiij vbby'
                }
            });

            const mailOptions = {
                from: 'psicoaguilassoporte@gmail.com',
                to: correo,
                subject: 'Actualización de estatus de tu cita',
                text: `El estatus de tu cita ha sido actualizado a: ${estatus}.`
            };

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log('Correo enviado:', info.response);
                res.json({ message: 'Estatus actualizado y correo enviado correctamente.' });
            } catch (emailError) {
                console.error('Error al enviar el correo:', emailError);
                res.status(500).json({ message: 'Estatus actualizado, pero falló el envío del correo.' });
            }
        } else {
            console.log('No se pudo actualizar el estatus para ID:', id);
            res.status(404).json({ message: 'No se pudo actualizar el estatus.' });
        }
    } catch (error) {
        console.error('Error en updateStatus:', error);
        res.status(500).json({ message: 'Error al actualizar el estatus.' });
    }
}















    


}

const citasController = new CitasController();
export default citasController;















