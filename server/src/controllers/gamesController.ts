import {Request, Response} from 'express';
import pool from'../database';

class GamesController{
	
	public async list(req: Request, resp : Response) : Promise<void> {
		const games = await pool.query('SELECT * FROM game');
		// resp.json({text: 'Listining games'});
		resp.json(games);
	} 

	public async getOne(req: Request, resp : Response) : Promise<any>{
        const {id} = req.params;
		const games = await pool.query('SELECT * FROM game WHERE id = ?', [id]);
		// resp.json({text: 'This is a game'+ req.params.id});
		if(games.length > 0){
			return resp.json(games[0]);
		}resp.status(404).json({text: 'The game doesnt exist'});
		console.log(games);
		resp.json({text: 'This is a game'+ req.params.id});
    }

	public async create(req: Request, resp : Response) : Promise<void> {
		await pool.query('INSERT INTO game set ?', [req.body]) ;
		console.log(req.body);
		resp.json({message: 'Game Saved  '});
	}

	public async put(req: Request, resp : Response): Promise<void> {
			// resp.json({text: 'Update a game  ' + req.params.id});
		const {id} = req.params;
		await pool.query('UPDATE game SET? WHERE id = ?', [req.body, id]);
		resp.json({messsage: 'Update success'});
		
	}
	
	public async delete(req: Request, resp : Response): Promise<void>{
		// resp.json({text: 'Delete a game ' + req.params.id});
		const {id} = req.params;
		pool.query('DELETE FROM game WHERE id = ?' , [id]);
		resp.json({message: 'Game deleted'});
	}

	
}
const gamesController = new GamesController();
export default gamesController;
