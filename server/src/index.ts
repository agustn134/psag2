import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Importar rutas
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import loginRoutes from './routes/loginRoutes'; // Asegúrate de importar las rutas de login
import userRoutes from './routes/userRoutes';
import consultoriosRoutes from './routes/consultoriosRoutes';
import horariosRoutes from './routes/horariosRoutes';
import citasRoutes from './routes/citasRoutes'

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/games', gamesRoutes);
        this.app.use('/api/login', loginRoutes);
        this.app.use('/api/user', userRoutes);
        this.app.use('/api/consultorios', consultoriosRoutes);
        this.app.use('/api/horarios', horariosRoutes);
        this.app.use('/api/citas', citasRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port: ${this.app.get('port')}`);
        });
    }
}

const server = new Server();
server.start();
