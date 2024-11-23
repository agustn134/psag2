import {Request, Response} from 'express';

class IndexController{
    public index (req:Request, res:Response){
        res.json({text: 'API Is /api/games'});
        res.json({text: 'API Is / indexRoutes'});
        res.json({text: 'API Is /api/login loginRoutes'});
        res.json({text: 'API Is /api/user userRoutes'});
        res.json({text: 'API Is /api/consultorios consultoriosRoutes'});
        res.json({text: 'API Is /api/horarios horariosRoutes'});
        res.json({text: 'API Is /api/citas citasRoutes'});
        res.json({text: 'API Is API Is /api/games'});
        res.json({text: 'API Is /api/games'});


        
    } 
}
export const indexController = new IndexController();