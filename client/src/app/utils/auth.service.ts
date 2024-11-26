import { Injectable } from '@angular/core';
// import { decode } from 'jwt-js-decode'; // paquete instalado
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());
  currentStatus = this.loggedIn.asObservable();

  private loggedInId = new BehaviorSubject<boolean>(this.checkIdStatus());
  currentStatusId = this.loggedInId.asObservable();

  private loggedInIdPsico = new BehaviorSubject<boolean>(this.checkIdStatusPsico());
  currentStatusIdPsico = this.loggedInIdPsico.asObservable();

  constructor() {}

  /**
   * Obtiene el token de la API.
   * @returns El token de la API si se encuentra en localStorage, o null si no existe.
   *
   * Decodificación manual del token JWT
   * Un JWT se compone de tres partes separadas por puntos (.):
   * Header (Encabezado)
   * Payload (Cuerpo, contiene los datos en Base64URL)
   * Signature (Firma)
   * El payload es lo que típicamente necesitas decodificar para obtener información como el id, rol, etc.
   *
   */
  private decodeJWT(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error al decodificar el token JWT:', error);
      return null;
    }
  }

  checkLoginStatus(): boolean {
    return !!localStorage.getItem('token');
  }

  checkIdStatus(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken = this.decodeJWT(token);
    if (!decodedToken) return false;

    const userRole = decodedToken['rol'];
    return userRole === 3; // Rol de admin
  }

  checkIdStatusPsico(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedToken = this.decodeJWT(token);
    if (!decodedToken) return false;

    const userRole = decodedToken['rol'];
    return userRole === 2; // Rol de admin
  }

  logIn(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
    this.loggedInId.next(this.checkIdStatus()); // Actualiza el estado de admin al iniciar sesión
  }

  logOut() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.loggedInId.next(false); // Actualiza el estado de admin al cerrar sesión
  }
}
