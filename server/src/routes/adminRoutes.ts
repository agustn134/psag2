import { Router } from "express";
import adminController from "../controllers/adminController"

class LoginRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        // Ruta para obtener la lista de usuarios
        this.router.get('/', adminController.list);
        // Ruta para obtener un usuario por su ID
        this.router.get('/:id_usuario', adminController.getOne);
        // Ruta para crear un nuevo usuario
        this.router.post('/', adminController.create);
        // Ruta para actualizar un usuario por su ID
        this.router.put('/:id_usuario', adminController.put);
        // Ruta para eliminar un usuario por su ID
        this.router.delete('/:id_usuario', adminController.delete);
        // Ruta para iniciar sesión
        this.router.post('/login', adminController.login); 
    }
}
const loginRoutes = new LoginRoutes();
export default loginRoutes.router;

