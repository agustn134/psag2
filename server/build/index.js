"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// Importar rutas
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes")); // Asegúrate de importar las rutas de login
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const consultoriosRoutes_1 = __importDefault(require("./routes/consultoriosRoutes"));
const horariosRoutes_1 = __importDefault(require("./routes/horariosRoutes"));
const citasRoutes_1 = __importDefault(require("./routes/citasRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/games', gamesRoutes_1.default);
        this.app.use('/api/login', loginRoutes_1.default);
        this.app.use('/api/user', userRoutes_1.default);
        this.app.use('/api/consultorios', consultoriosRoutes_1.default);
        this.app.use('/api/horarios', horariosRoutes_1.default);
        this.app.use('/api/citas', citasRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port: ${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();
