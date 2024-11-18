import { Request, Response } from "express";

import pool from '../database';

class ConsultorioController {

    public async list(req: Request, res: Response){
        const consultorios = await pool.query('SELECT * FROM tb_consultorio');
        res.json(consultorios);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const consultorio = await pool.query('SELECT * FROM tb_consultorio WHERE id_consultorio = ?', [id]);
        if (consultorio.length > 0) {
            return res.json(consultorio[0]);
        }
        res.status(404).json({ message: 'Consultorio no encontrado' }); // Mensaje correcto cuando no se encuentra el consultorio
    } 

    public async create (req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO tb_consultorio SET ?', [req.body]);
        res.json({ message: 'Consultorio Guardado' });
    }
    
    public async update (req: Request, res: Response): Promise<void> {
       const {id} = req.params;
       await pool.query('UPDATE tb_consultorio SET ? WHERE id_consultorio = ?', [req.body, id]);
       res.json({message: 'Consultorio actualizado'});
    }

    public async delete(req: Request, res: Response): Promise<any>{
        const {id} = req.params;
        await pool.query('DELETE FROM tb_consultorio WHERE id_consultorio =?', [id]);
        res.json({message: 'El Consultorio esta eliminado'})
    }
}

const consultorioController = new ConsultorioController();
export default consultorioController;
 