import { Router } from "express";
import userController from "../controllers/userController";

class UserRoutes{  
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        // // Obtener todos los usuarios
        // this.router.get('/', userController.list);
        // // Obtener todos lista con todos los psicólogos (usuarios con id_rol = 2)
        // this.router.get('/psychologists', userController.getPsychologists);
        // // Obtener un usuario por su ID
        // this.router.get('/:id_usuario', userController.getOne);

        // // Rutas adicionales para obtener carreras y roles
        // this.router.get('/carreras', userController.getCarreras);
        
        // this.router.get('/roles', userController.getRoles);

        // // Crear un nuevo usuario
        // this.router.post('/', userController.create);

        // // Actualizar un usuario por su ID
        // this.router.put('/:id_usuario', userController.put);

        // // Eliminar un usuario por su ID
        // this.router.delete('/:id_usuario', userController.delete);
        // Obtener todos los psicólogos (usuarios con id_rol = 2)
        this.router.get('/psychologists', userController.getPsychologists);
        // Rutas adicionales para obtener carreras y roles
        this.router.get('/carreras', userController.getCarreras);
        this.router.get('/roles', userController.getRoles);
        // Obtener un usuario por su ID
        this.router.get('/:id_usuario', userController.getOne);
        // Obtener todos los usuarios
        this.router.get('/', userController.list);
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