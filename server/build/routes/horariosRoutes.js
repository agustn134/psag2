"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const horariosController_1 = __importDefault(require("../controllers/horariosController"));
class HorariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', horariosController_1.default.list);
        this.router.get('/:id', horariosController_1.default.getOne);
        this.router.post('/', horariosController_1.default.create);
        this.router.put('/:id', horariosController_1.default.update);
        this.router.delete('/:id', horariosController_1.default.delete);
    }
}
const horariosRoutes = new HorariosRoutes();
exports.default = horariosRoutes.router;
