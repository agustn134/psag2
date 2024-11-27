"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        const message = `
            API Is /api/games
            API Is /indexRoutes
            API Is /api/login loginRoutes
            API Is /api/user userRoutes
            API Is /api/consultorios consultoriosRoutes
            API Is /api/horarios horariosRoutes
            API Is /api/citas citasRoutes
            API Is /api/games
        `;
        res.json({ text: message }); // Enviar todo el mensaje como un único campo en el objeto JSON
    }
}
exports.indexController = new IndexController();
