"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Obtener todos los usuarios
        this.router.get('/', userController_1.default.list);
        // Obtener un usuario por su ID
        this.router.get('/:id_usuario', userController_1.default.getOne);
        // Crear un nuevo usuario
        this.router.post('/', userController_1.default.create);
        // Actualizar un usuario por su ID
        this.router.put('/:id_usuario', userController_1.default.put);
        // Eliminar un usuario por su ID
        this.router.delete('/:id_usuario', userController_1.default.delete);
        // Rutas adicionales para obtener carreras y roles
        this.router.get('/carreras', userController_1.default.getCarreras);
        this.router.get('/roles', userController_1.default.getRoles);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
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
