"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class UserController {
    // Método para listar todos los usuarios
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.default.query('SELECT * FROM tb_usuarios');
            res.json(users);
        });
    }
    // Método para el login (autenticación)
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { e_mail, password } = req.body;
            if (!(e_mail && password)) {
                return res.status(400).json({ message: 'Email y contraseña son requeridos' });
            }
            try {
                const users = yield database_1.default.query('SELECT * FROM tb_usuarios WHERE e_mail = ?', [e_mail]);
                if (users.length > 0) {
                    const user = users[0];
                    // Aquí podrías comparar contraseñas si estuvieran encriptadas (ej: usando bcrypt)
                    if (user.password === password) {
                        return res.json({
                            message: 'Login exitoso',
                            user: {
                                id_usuario: user.id_usuario,
                                nombre: user.nombre,
                                ape_paterno: user.ape_paterno,
                                ape_materno: user.ape_materno,
                                e_mail: user.e_mail,
                                rol: user.rol
                            }
                        });
                    }
                    else {
                        return res.status(401).json({ message: 'Contraseña incorrecta' });
                    }
                }
                else {
                    return res.status(404).json({ message: 'El usuario no existe' });
                }
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Error en el servidor' });
            }
        });
    }
}
const usersController = new UserController();
exports.default = usersController;
