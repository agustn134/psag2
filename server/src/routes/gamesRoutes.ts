import { Router } from "express";
import gamesController from "../controllers/gamesController";
import validateToken from "./validate-token";
class GamesRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/',validateToken,gamesController.list);
        this.router.get('/:id',gamesController.getOne);
        this.router.post('/',gamesController.create);
        this.router.put('/:id',gamesController.put);
        this.router.delete('/:id',gamesController.delete);
    }
}
const gamesRoutes = new GamesRoutes();
export default gamesRoutes.router;