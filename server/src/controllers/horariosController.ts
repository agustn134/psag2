// import { Request, Response } from "express";

// import pool from '../database';

// class HorariosController {

//     public async list(req: Request, res: Response){
//         const horarios = await pool.query('SELECT * FROM tb_horarios');
//         res.json(horarios);
//     }

//     public async getOne(req: Request, res: Response): Promise<any> {
//         const { id } = req.params;
//         const Horario = await pool.query('SELECT * FROM tb_horarios WHERE id_horario = ?', [id]);
//         if (Horario.length > 0) {
//             return res.json(Horario[0]);
//         }
//         res.status(404).json({ message: 'Horario no encontrado' }); // Mensaje correcto cuando no se encuentra el consultorio
//     }

//     public async create (req: Request, res: Response): Promise<void> {
//         await pool.query('INSERT INTO tb_horarios SET ?', [req.body]);
//         res.json({ message: 'Horarios Guardado' });
//     }
    
//     public async update (req: Request, res: Response): Promise<void> {
//        const {id} = req.params;
//        await pool.query('UPDATE tb_horarios SET ? WHERE id_horario = ?', [req.body, id]);
//        res.json({message: 'Horario actualizado'});
//     }

//     public async delete(req: Request, res: Response): Promise<any>{
//         const {id} = req.params;
//         await pool.query('DELETE FROM tb_horarios WHERE id_horario =?', [id]);
//         res.json({message: 'El Horario esta eliminado'})
//     }
// }

// const horariosController = new HorariosController();
// export default horariosController;
 


import { Request, Response } from "express";
import pool from '../database';

class HorariosController {

    // Obtener todos los horarios
    public async list(req: Request, res: Response): Promise<void> {
        try {
            const horarios = await pool.query('SELECT * FROM tb_horarios');
            res.json(horarios);
        } catch (error) {
            res.status(500).json({ message: 'Error al listar los horarios', error });
        }
    }

    // Obtener un horario por su ID
    public async getOne(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const horario = await pool.query('SELECT * FROM tb_horarios WHERE id_horario = ?', [id]);
            if (horario.length > 0) {
                res.json(horario[0]);
            } else {
                res.status(404).json({ message: 'Horario no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el horario', error });
        }
    }

    // Crear un nuevo horario
    public async create(req: Request, res: Response): Promise<void> {
        try {
            await pool.query('INSERT INTO tb_horarios SET ?', [req.body]);
            res.json({ message: 'Horario guardado con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el horario', error });
        }
    }
    
    // Actualizar un horario existente
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const result = await pool.query('UPDATE tb_horarios SET ? WHERE id_horario = ?', [req.body, id]);
            if (result.affectedRows > 0) {
                res.json({ message: 'Horario actualizado con éxito' });
            } else {
                res.status(404).json({ message: 'Horario no encontrado para actualizar' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el horario', error });
        }
    }

    // Eliminar un horario por su ID
    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const result = await pool.query('DELETE FROM tb_horarios WHERE id_horario = ?', [id]);
            if (result.affectedRows > 0) {
                res.json({ message: 'Horario eliminado con éxito' });
            } else {
                res.status(404).json({ message: 'Horario no encontrado para eliminar' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el horario', error });
        }
    }
}

const horariosController = new HorariosController();
export default horariosController;
