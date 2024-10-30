// import { Request, Response } from "express";

// import pool from '../database';

// class CitasController {

//     public async list(req: Request, res: Response){
//         const citas = await pool.query('SELECT * FROM tb_citas');
//         res.json(citas);
//     }

//     public async getOne(req: Request, res: Response): Promise<any> {
//         const { id } = req.params;
//         const cita = await pool.query('SELECT * FROM tb_citas WHERE id_citas = ?', [id]);
//         if (cita.length > 0) {
//             return res.json(cita[0]);
//         }
//         res.status(404).json({ message: 'cita no encontrado' }); // Mensaje correcto cuando no se encuentra el cita
//     }

//     public async create (req: Request, res: Response): Promise<void> {
//         await pool.query('INSERT INTO tb_citas SET ?', [req.body]);
//         res.json({ message: 'cita Guardado' });
//     }
    
//     public async update (req: Request, res: Response): Promise<void> {
//        const {id} = req.params;
//        await pool.query('UPDATE tb_citas SET ? WHERE id_citas = ?', [req.body, id]);
//        res.json({message: 'cita actualizado'});
//     }

//     public async delete(req: Request, res: Response): Promise<any>{
//         const {id} = req.params;
//         await pool.query('DELETE FROM tb_citas WHERE id_citas =?', [id]);
//         res.json({message: 'El cita esta eliminado'})
//     }
// }

// const citasController = new CitasController();
// export default citasController;
 









import { Request, Response } from "express";
import pool from '../database';

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

    public async create(req: Request, res: Response): Promise<void> {
        // Verifica que req.body contenga todos los campos necesarios
        const { id_psicologo, id_alumno, id_consultorio, id_horario, motivo } = req.body;
        if (!id_psicologo || !id_alumno || !id_consultorio || !id_horario || !motivo) {
            res.status(400).json({ message: 'Faltan datos necesarios para crear la cita' });
            return;
        }

        // Verificar si ya existe una cita con el mismo id_psicologo e id_horario
    const existingCita = await pool.query(
        'SELECT * FROM tb_citas WHERE id_psicologo = ? AND id_horario = ?', 
        [id_psicologo, id_horario]
    );

    if (existingCita.length > 0) {
        // Si existe, devolver un error
        res.status(400).json({ message: 'Ya existe una cita para este psicólogo en el mismo horario.' });
        return;
    }

        await pool.query('INSERT INTO tb_citas SET ?', [req.body]);
        res.json({ message: 'Cita guardada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const updatedCita = await pool.query('UPDATE tb_citas SET ? WHERE id_cita = ?', [req.body, id]);

        if (updatedCita.affectedRows > 0) {
            res.json({ message: 'Cita actualizada' });
        } else {
            res.status(404).json({ message: 'Cita no encontrada' });
        }
    }

    public async delete(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM tb_citas WHERE id_cita = ?', [id]);

        if (result.affectedRows > 0) {
            res.json({ message: 'Cita eliminada' });
        } else {
            res.status(404).json({ message: 'Cita no encontrada' });
        }
    }
}

const citasController = new CitasController();
export default citasController;
