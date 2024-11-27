import { Request, Response } from 'express';

class IndexController {
    public index(req: Request, res: Response) {
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

export const indexController = new IndexController();
