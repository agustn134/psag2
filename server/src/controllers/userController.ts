import { Request, Response } from "express";
import pool from "../database";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';  
import keys from '../keys';  
import nodemailer from "nodemailer"; // Importar Nodemailer

class UserController {

    // Obtener todos los usuarios
    public async list(req: Request, resp: Response): Promise<void> {
		const users = await pool.query('SELECT * FROM tb_usuarios');
		resp.json(users);
	}

    // Obtener un usuario por su ID
    public async getOne(req: Request, res: Response): Promise<any> {
        const { id_usuario } = req.params;
        const users = await pool.query('SELECT * FROM tb_usuarios WHERE id_usuario = ?', [id_usuario]);
        if (users.length > 0) {
            res.json(users[0]);
        } else {
            res.status(404).json({ text: "The user doesn't exist" });
        }
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

    public async create(req: Request, resp: Response): Promise<void> {
        try {
            const { password, e_mail, nombre, ape_paterno, ape_materno, telefono, grupo, id_carrera, id_rol, imagen_url } = req.body;

            // Verificar si el correo electrónico ya está registrado
            const existingUser = await pool.query('SELECT * FROM tb_usuarios WHERE e_mail = ?', [e_mail]);
            if (existingUser.length > 0) {
                 resp.status(400).json({ message: 'Email already exists' });
            }

            // Generar el hash de la contraseña usando bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const existingCarrera = await pool.query(
              "SELECT * FROM tb_carreras WHERE id_carrera = ?",
              [id_carrera]
            );
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
            await pool.query('INSERT INTO tb_usuarios SET ?', [newUser]);

            // Configuración de Nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'psicoaguilassoporte@gmail.com',  // Tu correo
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
            await transporter.sendMail(mailOptions);

            resp.json({ message: 'User created and email sent' });
        } catch (error) {
            console.error('Error al crear usuario:', error);
            resp.status(500).json({ message: 'Error al crear el usuario' });
        }
    }














    // Actualizar un usuario
    public async put(req: Request, res: Response): Promise<void> {
        const { id_usuario } = req.params;
        await pool.query('UPDATE tb_usuarios SET ? WHERE id_usuario = ?', [req.body, id_usuario]);
        res.json({ message: 'User updated' });
    }

    // Eliminar un usuario
    public async delete(req: Request, res: Response): Promise<void> {
        const { id_usuario } = req.params;
        await pool.query('DELETE FROM tb_usuarios WHERE id_usuario = ?', [id_usuario]);
        res.json({ message: 'User deleted' });
    }



 }
 

 const userController = new UserController();
export default userController;
