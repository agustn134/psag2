"use strict";
// export default{
//     database:{
//         // host: 'localhost',
//         // user: 'root',
//         // password: '',
//         // database: 'bd_psga6'
//         host: 'sql3.freesqldatabase.com',
//         user: 'sql3746356',
//         password: 'Eb42zTrQXh',
//         database: 'sql3746356',
//         port: 3306 // Opcional si ya es el puerto predeterminado
//     },
//     jwtSecret: '1234567890'
Object.defineProperty(exports, "__esModule", { value: true });
// }
exports.default = {
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'bd_psga6',
        port: parseInt(process.env.DB_PORT || '3306', 10),
    },
    jwtSecret: process.env.JWT_SECRET || '1234567890',
};
