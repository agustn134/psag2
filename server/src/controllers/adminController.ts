import { Request, Response } from "express";
import pool from "../database";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';  
import keys from '../keys';  

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
	
	public async create(req: Request, resp: Response): Promise<void> {
		try {
			// Obtener la contraseña y el correo electrónico del cuerpo de la solicitud
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
			await pool.query('INSERT INTO tb_usuarios SET ?', [newUser]);
			console.log(newUser); 
			resp.json({ message: 'User Saved' });
		} catch (error) {
			console.error('Error al crear usuario:', error);
			resp.status(500).json({ message: 'Error al crear el usuario' });
		}
	}


	// public async put(req: Request, resp: Response): Promise<void> {
	// 	// Extraer el ID del usuario de los parámetros de la solicitud
	// 	const { id_usuario } = req.params;
	// 	// Actualizar los datos del usuario en la base de datos utilizando el ID
	// 	// Se utiliza un placeholder (?) para prevenir inyecciones SQL
	// 	// 'req.body' contiene los nuevos datos del usuario que se van a actualizar
	// 	await pool.query('UPDATE tb_usuarios SET ? WHERE id_usuario = ?', [req.body, id_usuario]);
	// 	// Enviar una respuesta indicando que la actualización fue exitosa
	// 	resp.json({ message: 'Update success' });
	// }


	// public async delete(req: Request, resp: Response): Promise<void> {
	// 	// Extraer el ID del usuario de los parámetros de la solicitud
	// 	const { id_usuario } = req.params;
	// 	// Eliminar el usuario de la base de datos utilizando el ID
	// 	// Se usa un placeholder (?) para prevenir inyecciones SQL
	// 	await pool.query('DELETE FROM tb_usuarios WHERE id_usuario = ?', [id_usuario]);
	// 	// Enviar una respuesta indicando que el usuario ha sido eliminado
	// 	resp.json({ message: 'User deleted' });
	// }


}

const adminController = new AdminController();
export default adminController;
