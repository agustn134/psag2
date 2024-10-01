// import { NextFunction, Request, Response } from "express";
// import Jwt  from "jsonwebtoken";
// import keys from "../keys";

// const validateToken = (req: Request, res: Response, next: NextFunction ) =>{
    
//     // Aquí validar el token
//     const headerToken = req.headers['authorization']
    
//     console.log( headerToken);

//     if(headerToken != undefined && headerToken.startsWith('Bearer ')){
//         // Suponer afirmar que Tiene token
//         try{
//         const bearerToken = headerToken.slice(7);
//         console.log(bearerToken)  

//         Jwt.verify(bearerToken, keys.jwtSecret ||  '1234567890' );

//          //  jwtSecret: '1234567890'

//         //Pero falta validar si el valido o no el token
//         next()

//         }catch(error){

//             res.status(400).json({
//                 msg: 'Token invalido'
//             })
//             return
//         }
//     }else{
//         res.status(401).json({
//             msg: 'Acceso DENEGADO'
//         })
//     }
    
// }

// export default validateToken;


//////////////////////////////////////////////////////////////////

// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken"; // Asegúrate de haber instalado este paquete
// import keys from "../keys"; // Asegúrate de que esta ruta sea correcta
// import gamesController from "../controllers/gamesController";

// const validateToken = (roles: string[]) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         const token = req.headers["authorization"]?.split(" ")[1];

//         if (!token) {
//             return res.status(403).json({ message: "No token provided" });
//         }

//         jwt.verify(token, keys.jwtSecret, (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({ message: "Unauthorized" });
//             }

//             req.id_usuario = decoded.id;
//             req.id_rol = decoded.rol;

//             // Verificar si el rol del usuario está permitido
//             if (roles && !roles.includes(req.id_rol)) {
//                 return res.status(403).json({ message: "Forbidden" });
//             }

//             next();
//         });
//     };
// };

// // Uso en tus rutas
// this.router.get('/', validateToken(['Admin', 'Psicologo']), gamesController.list);
///////////////////////////////////////////////////////////////////////////////////////




// import { NextFunction, Request, Response } from "express";
// import Jwt from "jsonwebtoken";
// import keys from "../keys";

// const validateToken = (req: Request, res: Response, next: NextFunction) => {
//     // Obtener el token de las cabeceras de la solicitud
//     const headerToken = req.headers['authorization'];

//     console.log(headerToken);

//     if (headerToken && headerToken.startsWith('Bearer ')) {
//         // Extraer el token sin el prefijo 'Bearer '
//         const bearerToken = headerToken.slice(7);
//         console.log(bearerToken);

//         try {
//             // Verificar el token usando el secreto
//             const decoded = Jwt.verify(bearerToken, keys.jwtSecret || '1234567890');

//             // Puedes acceder a la información del token decodificado si es necesario
//             console.log('Token decodificado:', decoded);

//             // Continuar con la siguiente función en la cadena de middlewares
//             next();
//         } catch (error) {
//             // Si el token no es válido, devolver un error
//             console.error('Error al verificar el token:', error);
//             res.status(400).json({
//                 msg: 'Token inválido'
//             });

            
//         }
//     } else {
//         // Si no se proporciona un token o es incorrecto, devolver un error
//         res.status(401).json({
//             msg: 'Acceso DENEGADO: No se proporcionó un token válido'
//         });
//     }
// };

// export default validateToken;
import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";  // Importa JwtPayload
import keys from "../keys";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];

    console.log(headerToken);

    if (headerToken && headerToken.startsWith('Bearer ')) {
        const bearerToken = headerToken.slice(7);
        console.log(bearerToken);

        try {
            // Verificar el token usando el secreto
            const decoded = Jwt.verify(bearerToken, keys.jwtSecret || '1234567890');

            // Verificar que decoded sea de tipo JwtPayload antes de acceder a 'id'
            if (typeof decoded === 'object' && 'id' in decoded) {
                const userId = (decoded as JwtPayload).id;  // Acceder a la propiedad 'id' con seguridad
                console.log('User ID:', userId);
            } else {
                throw new Error('Invalid token structure');
            }

            next();  // Continuar con la cadena de middlewares
        } catch (error) {
            console.error('Error al verificar el token:', error);
            res.status(400).json({
                msg: 'Token inválido'
            });
        }
    } else {
        res.status(401).json({
            msg: 'Acceso DENEGADO: No se proporcionó un token válido'
        });
    }
};

export default validateToken;
