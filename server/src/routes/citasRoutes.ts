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
        this.router.get('/psicologo/:id_psicologo', citasController.getByPsicologo);
        this.router.get('/alumno/:id_alumno', citasController.getByAlumno);
        this.router.get('/emails/role', citasController.getEmailsByRole);
        this.router.post('/conference', citasController.sendConferenceMail);
        this.router.post('/', citasController.create);
        this.router.put('/:id/status', citasController.updateStatus);
    }
}
const citasRoutes = new CitasRoutes();
export default citasRoutes.router;