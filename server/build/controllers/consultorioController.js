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
class ConsultorioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const consultorios = yield database_1.default.query('SELECT * FROM tb_consultorio');
            res.json(consultorios);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const consultorio = yield database_1.default.query('SELECT * FROM tb_consultorio WHERE id_consultorio = ?', [id]);
            if (consultorio.length > 0) {
                return res.json(consultorio[0]);
            }
            res.status(404).json({ message: 'Consultorio no encontrado' }); // Mensaje correcto cuando no se encuentra el consultorio
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO tb_consultorio SET ?', [req.body]);
            res.json({ message: 'Consultorio Guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE tb_consultorio SET ? WHERE id_consultorio = ?', [req.body, id]);
            res.json({ message: 'Consultorio actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM tb_consultorio WHERE id_consultorio =?', [id]);
            res.json({ message: 'El Consultorio esta eliminado' });
        });
    }
}
const consultorioController = new ConsultorioController();
exports.default = consultorioController;
