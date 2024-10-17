import { Router } from "express";
import loginController from "../controllers/loginController";

class LoginRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        // Ruta para obtener la lista de usuarios
        this.router.get('/', loginController.list);
        // Ruta para obtener un usuario por su ID
        this.router.get('/:id_usuario', loginController.getOne);
        // Ruta para crear un nuevo usuario
        this.router.post('/', loginController.create);
        // Ruta para actualizar un usuario por su ID
        this.router.put('/:id_usuario', loginController.put);
        // Ruta para eliminar un usuario por su ID
        this.router.delete('/:id_usuario', loginController.delete);
        // Ruta para iniciar sesión
        this.router.post('/login', loginController.login); 
    }
}
const loginRoutes = new LoginRoutes();
export default loginRoutes.router;

