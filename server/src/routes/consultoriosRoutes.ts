import { Router } from "express";

import consultorioController from '../controllers/consultorioController'


class ConsultoriosRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', consultorioController.list);
        this.router.get('/:id', consultorioController.getOne);
        this.router.post('/', consultorioController.create);
        this.router.put('/:id', consultorioController.update);
        this.router.delete('/:id', consultorioController.delete);

    }
}
const consultoriosRoutes = new ConsultoriosRoutes();
export default consultoriosRoutes.router;