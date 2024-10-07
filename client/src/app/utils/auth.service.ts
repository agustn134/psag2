// import { Injectable } from '@angular/core';
// import { decode } from 'jwt-js-decode';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());
//   currentStatus = this.loggedIn.asObservable();

//   private loggedInId = new BehaviorSubject<boolean>(this.checkIdStatus());
//   currentStatusId = this.loggedInId.asObservable();

//   constructor() {}

//   checkLoginStatus(): boolean {
//     // Verifica si el token existe en localStorage
//     return !!localStorage.getItem('token');
//   }

//   checkIdStatus(): boolean {
//     // Verifica si el token existe y si el id_rol es 3
//     const token = localStorage.getItem('token');
//     if (!token) return false; // Si no hay token, retorna false

//     const decodedToken = decode(token); // Decodifica el token
//     const userId = decodedToken.payload['id_rol']; // Cambia 'id' por que segun en mi estructura se muestra "id:" en la consola

//     return userId === '3' && !!localStorage.getItem('token');; // Verifica si el rol es 3 (asumiendo que es el rol de admin)
//   }

//   logIn(token: string) {
//     localStorage.setItem('token', token);
//     this.loggedIn.next(true);
//     this.loggedInId.next(this.checkIdStatus()); // Actualiza el estado de admin al iniciar sesión

//   }

//   logOut() {
//     localStorage.removeItem('token');
//     this.loggedIn.next(false);
//     this.loggedInId.next(false); // Actualiza el estado de admin al cerrar sesión

//   }

// }




// import { Injectable } from '@angular/core';
// import { decode } from 'jwt-js-decode';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());
//   currentStatus = this.loggedIn.asObservable();

//   private loggedInId = new BehaviorSubject<boolean>(this.isAdmin());
//   currentStatusId = this.loggedInId.asObservable();

//   constructor() {}

//   checkLoginStatus(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   isAdmin(): boolean {
//     const token = localStorage.getItem('token');
//     if (!token) return false;

//     const decodedToken = decode(token);
//     const userRole = decodedToken.payload['id']; // Asegúrate de que esta propiedad sea correcta

//     return userRole === '3'; // Verifica si el rol es 3 para admin
//   }

//   logIn(token: string) {
//     localStorage.setItem('token', token);
//     this.loggedIn.next(true);
//     this.loggedInId.next(this.isAdmin()); // Actualiza el estado de admin al iniciar sesión
//   }

//   logOut() {
//     localStorage.removeItem('token');
//     this.loggedIn.next(false);
//     this.loggedInId.next(false); // Actualiza el estado de admin al cerrar sesión
//   }
// }



import { Injectable } from '@angular/core';
import { decode } from 'jwt-js-decode'; // Asegúrate de tener este paquete instalado
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());
  currentStatus = this.loggedIn.asObservable();

  private loggedInId = new BehaviorSubject<boolean>(this.checkIdStatus());
  currentStatusId = this.loggedInId.asObservable();

  constructor() {}

  checkLoginStatus(): boolean {
    return !!localStorage.getItem('token');
  }

  checkIdStatus(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false; // Si no hay token, retorna false

    const decodedToken = decode(token); // Decodifica el token
    const userRole = decodedToken.payload['rol']; // Accede a 'rol' en vez de 'id_rol'

    return userRole === 3; // Verifica si el rol es 3 (asumiendo que es el rol de admin)
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
