import { Router } from 'express';
import horariosController from '../controllers/horariosController'


class HorariosRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void{
        this.router.get('/', horariosController.list);
        this.router.get('/:id', horariosController.getOne);
        this.router.post('/', horariosController.create);
        this.router.put('/:id', horariosController.update);
        this.router.delete('/:id', horariosController.delete);

    }
}
const horariosRoutes = new HorariosRoutes();
export default horariosRoutes.router;