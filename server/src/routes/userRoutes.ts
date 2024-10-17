import { Router } from "express";
import userController from "../controllers/userController";

class UserRoutes{  
    public router: Router = Router();

    constructor(){
        this.config();
    }


    // config(): void {
    //     // Ruta para obtener la lista de usuarios
    //     // this.router.get('/', userController.list);
    //     // Ruta para obtener un usuario por su ID
    //     this.router.get('/:id_usuario', userController.getOne);
    //     // Ruta para crear un nuevo usuario
    //     // this.router.post('/', userController.create);
    //     // Ruta para actualizar un usuario por su ID
    //     // this.router.put('/:id_usuario', userController.put);
    //     // Ruta para eliminar un usuario por su ID
    //     // this.router.delete('/:id_usuario', userController.delete);
    //     // Ruta para iniciar sesión
    //     // this.router.post('/login', userController.login); 
    // }

    config(): void {
        // Obtener todos los usuarios
        this.router.get('/', userController.list);

        // Obtener un usuario por su ID
        this.router.get('/:id_usuario', userController.getOne);

        // Crear un nuevo usuario
        this.router.post('/', userController.create);

        // Actualizar un usuario por su ID
        this.router.put('/:id_usuario', userController.put);

        // Eliminar un usuario por su ID
        this.router.delete('/:id_usuario', userController.delete);
    }

}
const userRoutes = new UserRoutes();
export default userRoutes.router;