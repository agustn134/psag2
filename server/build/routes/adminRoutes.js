"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controllers/adminController"));
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        // Ruta para obtener la lista de usuarios
        this.router.get('/', adminController_1.default.list);
        // Ruta para obtener un usuario por su ID
        this.router.get('/:id_usuario', adminController_1.default.getOne);
        // Ruta para crear un nuevo usuario
        this.router.post('/', adminController_1.default.create);
        // Ruta para actualizar un usuario por su ID
        this.router.put('/:id_usuario', adminController_1.default.put);
        // Ruta para eliminar un usuario por su ID
        this.router.delete('/:id_usuario', adminController_1.default.delete);
        // Ruta para iniciar sesión
        this.router.post('/login', adminController_1.default.login);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
