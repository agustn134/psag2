"use strict";
// import { Request, Response } from "express";
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
class HorariosController {
    // Obtener todos los horarios
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const horarios = yield database_1.default.query('SELECT * FROM tb_horarios');
                res.json(horarios);
            }
            catch (error) {
                res.status(500).json({ message: 'Error al listar los horarios', error });
            }
        });
    }
    // Obtener un horario por su ID
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const horario = yield database_1.default.query('SELECT * FROM tb_horarios WHERE id_horario = ?', [id]);
                if (horario.length > 0) {
                    res.json(horario[0]);
                }
                else {
                    res.status(404).json({ message: 'Horario no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al obtener el horario', error });
            }
        });
    }
    // Crear un nuevo horario
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO tb_horarios SET ?', [req.body]);
                res.json({ message: 'Horario guardado con éxito' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error al crear el horario', error });
            }
        });
    }
    // Actualizar un horario existente
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield database_1.default.query('UPDATE tb_horarios SET ? WHERE id_horario = ?', [req.body, id]);
                if (result.affectedRows > 0) {
                    res.json({ message: 'Horario actualizado con éxito' });
                }
                else {
                    res.status(404).json({ message: 'Horario no encontrado para actualizar' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al actualizar el horario', error });
            }
        });
    }
    // Eliminar un horario por su ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield database_1.default.query('DELETE FROM tb_horarios WHERE id_horario = ?', [id]);
                if (result.affectedRows > 0) {
                    res.json({ message: 'Horario eliminado con éxito' });
                }
                else {
                    res.status(404).json({ message: 'Horario no encontrado para eliminar' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error al eliminar el horario', error });
            }
        });
    }
}
const horariosController = new HorariosController();
exports.default = horariosController;
