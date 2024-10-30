"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultorioController_1 = __importDefault(require("../controllers/consultorioController"));
class ConsultoriosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', consultorioController_1.default.list);
        this.router.get('/:id', consultorioController_1.default.getOne);
        this.router.post('/', consultorioController_1.default.create);
        this.router.put('/:id', consultorioController_1.default.update);
        this.router.delete('/:id', consultorioController_1.default.delete);
    }
}
const consultoriosRoutes = new ConsultoriosRoutes();
exports.default = consultoriosRoutes.router;
