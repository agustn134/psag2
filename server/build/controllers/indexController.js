"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    index(req, res) {
        res.json({ text: 'API Is /api/games' });
        res.json({ text: 'API Is / indexRoutes' });
        res.json({ text: 'API Is /api/login loginRoutes' });
        res.json({ text: 'API Is /api/user userRoutes' });
        res.json({ text: 'API Is /api/consultorios consultoriosRoutes' });
        res.json({ text: 'API Is /api/horarios horariosRoutes' });
        res.json({ text: 'API Is /api/citas citasRoutes' });
        res.json({ text: 'API Is API Is /api/games' });
        res.json({ text: 'API Is /api/games' });
    }
}
exports.indexController = new IndexController();
