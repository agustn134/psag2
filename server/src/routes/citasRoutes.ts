import { Router } from "express";

import citasController from '../controllers/citasController';


class CitasRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', citasController.list);
        this.router.get('/:id', citasController.getOne);
        this.router.post('/', citasController.create);
        this.router.put('/:id', citasController.update);
        this.router.delete('/:id', citasController.delete);

    }
}
const citasRoutes = new CitasRoutes();
export default citasRoutes.router;