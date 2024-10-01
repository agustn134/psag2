"use strict";
// import { NextFunction, Request, Response } from "express";
// import Jwt  from "jsonwebtoken";
// import keys from "../keys";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importa JwtPayload
const keys_1 = __importDefault(require("../keys"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    console.log(headerToken);
    if (headerToken && headerToken.startsWith('Bearer ')) {
        const bearerToken = headerToken.slice(7);
        console.log(bearerToken);
        try {
            // Verificar el token usando el secreto
            const decoded = jsonwebtoken_1.default.verify(bearerToken, keys_1.default.jwtSecret || '1234567890');
            // Verificar que decoded sea de tipo JwtPayload antes de acceder a 'id'
            if (typeof decoded === 'object' && 'id' in decoded) {
                const userId = decoded.id; // Acceder a la propiedad 'id' con seguridad
                console.log('User ID:', userId);
            }
            else {
                throw new Error('Invalid token structure');
            }
            next(); // Continuar con la cadena de middlewares
        }
        catch (error) {
            console.error('Error al verificar el token:', error);
            res.status(400).json({
                msg: 'Token inválido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso DENEGADO: No se proporcionó un token válido'
        });
    }
};
exports.default = validateToken;
