"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citasController_1 = __importDefault(require("../controllers/citasController"));
class CitasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', citasController_1.default.list);
        this.router.get('/:id', citasController_1.default.getOne);
        // this.router.post('/', citasController.create);
        // this.router.put('/:id', citasController.update);
        // this.router.delete('/:id', citasController.delete);
        this.router.put('/:id/status', citasController_1.default.updateStatus);
    }
}
const citasRoutes = new CitasRoutes();
exports.default = citasRoutes.router;
