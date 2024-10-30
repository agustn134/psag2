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
class CitasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const citas = yield database_1.default.query(`
            SELECT c.*, p.nombre AS psicologo, a.nombre AS alumno
            FROM tb_citas c
            JOIN tb_usuarios p ON c.id_psicologo = p.id_usuario
            JOIN tb_usuarios a ON c.id_alumno = a.id_usuario
        `);
            res.json(citas);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cita = yield database_1.default.query('SELECT * FROM tb_citas WHERE id_cita = ?', [id]);
            if (cita.length > 0) {
                return res.json(cita[0]);
            }
            res.status(404).json({ message: 'Cita no encontrada' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verifica que req.body contenga todos los campos necesarios
            const { id_psicologo, id_alumno, id_consultorio, id_horario, motivo } = req.body;
            if (!id_psicologo || !id_alumno || !id_consultorio || !id_horario || !motivo) {
                res.status(400).json({ message: 'Faltan datos necesarios para crear la cita' });
                return;
            }
            // Verificar si ya existe una cita con el mismo id_psicologo e id_horario
            const existingCita = yield database_1.default.query('SELECT * FROM tb_citas WHERE id_psicologo = ? AND id_horario = ?', [id_psicologo, id_horario]);
            if (existingCita.length > 0) {
                // Si existe, devolver un error
                res.status(400).json({ message: 'Ya existe una cita para este psicólogo en el mismo horario.' });
                return;
            }
            yield database_1.default.query('INSERT INTO tb_citas SET ?', [req.body]);
            res.json({ message: 'Cita guardada' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updatedCita = yield database_1.default.query('UPDATE tb_citas SET ? WHERE id_cita = ?', [req.body, id]);
            if (updatedCita.affectedRows > 0) {
                res.json({ message: 'Cita actualizada' });
            }
            else {
                res.status(404).json({ message: 'Cita no encontrada' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield database_1.default.query('DELETE FROM tb_citas WHERE id_cita = ?', [id]);
            if (result.affectedRows > 0) {
                res.json({ message: 'Cita eliminada' });
            }
            else {
                res.status(404).json({ message: 'Cita no encontrada' });
            }
        });
    }
}
const citasController = new CitasController();
exports.default = citasController;
