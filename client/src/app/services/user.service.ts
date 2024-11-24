// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from '../models/user'; // Importa la interfaz de usuario
// import { Userlog } from '../models/userlog'; // Importa la interfaz para el login
// import { decode } from 'jwt-js-decode'; // Importa para decodificar el token JWT

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private apiUrl = 'http://localhost:3000/api'; // URL base de tu API

//   constructor(private http: HttpClient) {}

//   // ----------------------- MÉTODOS RELACIONADOS CON USUARIOS -----------------------

//   /**
//    * Obtiene todos los usuarios de la API.
//    * @returns Un Observable que emite una lista de usuarios (User[]).
//    */
//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(`${this.apiUrl}/login`);
//   }

//   // Obtener todos los psicólogos (usuarios con id_rol = 2)
//   // getPsychologists(): Observable<User[]> {
//   //   return this.http.get<User[]>(`${this.apiUrl}/user/psychologists`);
//   // }
//   getPsychologists(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/user/psychologists`);
// }

// getPsychologistsAndSendEmail(): Observable<any[]> {
//   return this.http.get<any[]>(`${this.apiUrl}/user/psychologists/send-email`);
// }

//   /**
//    * Obtiene un usuario por su ID desde la API.
//    * @param id El ID del usuario que se desea obtener.
//    * @returns Un Observable que emite un usuario (User).
//    */
//   getUserById(id: number): Observable<User> {
//     return this.http.get<User>(`${this.apiUrl}/login/${id}`);
//   }

//   /**
//    * Guarda un nuevo usuario en la base de datos a través de la API.
//    * @param user El objeto de tipo User que se va a guardar.
//    * @returns Un Observable que emite el usuario guardado (User).
//    */
//   saveUser(user: User): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/login`, user);
//   }

//   /**
//    * Actualiza los datos de un usuario existente.
//    * @param id El ID del usuario que se va a actualizar.
//    * @param user El objeto de tipo User con los datos actualizados.
//    * @returns Un Observable que emite el usuario actualizado (User).
//    */
//   updateUser(id: number, user: User): Observable<User> {
//     return this.http.put<User>(`${this.apiUrl}/login/${id}`, user);
//   }

//   /**
//    * Crea un nuevo usuario (función alternativa a saveUser).
//    * @param user El objeto de tipo User que se va a crear.
//    * @returns Un Observable que emite el usuario creado (User).
//    */
//   createUser(user: User): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/login/`, user);
//   }

//   /**
//    * Elimina un usuario según su ID.
//    * @param id El ID del usuario que se va a eliminar.
//    * @returns Un Observable que emite void (sin valor de retorno).
//    */
//   deleteUser(id: string): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/login/${id}`);
//   }

//   /**
//    * Método específico para que el administrador cree un nuevo usuario.
//    * @param user El objeto de tipo User que se va a crear.
//    * @returns Un Observable que emite el usuario creado (User).
//    */
//   createUserByAdmin(user: User): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/user`, user);
//   }

//   // ----------------------- MÉTODOS RELACIONADOS CON AUTENTICACIÓN -----------------------

//   /**
//    * Realiza el login del usuario, devolviendo un token JWT.
//    * @param userlog Objeto de tipo Userlog que contiene las credenciales de inicio de sesión.
//    * @returns Un Observable que emite un string (el token JWT).
//    */
//   loginUser(userlog: Userlog): Observable<string> {
//     return this.http.post<string>(`${this.apiUrl}/login/login`, userlog);
//   }

//   /**
//    * Obtiene el ID del usuario decodificando el token JWT almacenado en el localStorage.
//    * @returns El ID del usuario si se encuentra el token, o null si no existe.
//    */
//   getUserIdFromToken(): number | null {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.log('Token no encontrado');
//       return null;
//     }
//       try {
//       const decodedToken = decode(token);
//       const userId = decodedToken.payload['id'];
//         const id_rol = decodedToken.payload['rol'];
//       console.log('ID de usuario extraído del token:', userId);
//       console.log('Rol del usuario extraído del token:', id_rol);
//       return userId;
//       return id_rol;
//     } catch (error) {
//       console.error('Error al decodificar el token:', error);
//       return null;
//     }
//   }

//   getUserDetailsFromToken(): { id_usuario: number; id_rol: number } | null {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.log('Token no encontrado');
//       return null;
//     }
//     try {
//       const decodedToken = decode(token);
//       const userId = decodedToken.payload['id'];
//       const userRole = decodedToken.payload['rol'];
//       console.log('ID de usuario extraído del token:', userId);
//       console.log('Rol del usuario extraído del token:', userRole);
//       return { id_usuario: userId, id_rol: userRole };
//     } catch (error) {
//       console.error('Error al decodificar el token:', error);
//       return null;
//     }
//   }




//   /**
//    * Obtiene el perfil del usuario autenticado usando su ID extraído del token.
//    * @returns Un Observable que emite el objeto User del usuario autenticado.
//    */
//   getUserProfile(): Observable<User> {
//     const userId = this.getUserIdFromToken();
//     if (userId !== null) {
//       return this.getUserById(userId);
//     } else {
//       throw new Error('No se pudo obtener el ID de usuario desde el token.');
//     }
//   }

//   /**
//    * Obtiene todas las carreras de la API.
//    * @returns Un Observable que emite una lista de carreras.
//    */
//   getCarreras(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/user/carreras`);
//   }

//   /**
//    * Obtiene todos los roles de la API.
//    * @returns Un Observable que emite una lista de roles.
//    */
//   getRoles(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/user/roles`);
//   }
// }

/**
    *
    * Para reemplazar el uso de decode de 'jwt-js-decode' en el servicio UserService con
    * la misma lógica manual de decodificación utilizada en AuthService, puedes
    * seguir los siguientes pasos:
    *
    * Cambios Requeridos
Elimina la dependencia jwt-js-decode:

Sustituye todas las referencias a decode() por la lógica manual de decodificación de JWT.
Incorpora la función de decodificación personalizada:

Añade la función decodeJWT() usada en el AuthService al UserService.
Actualiza los métodos que usan decode():

Adapta los métodos como getUserIdFromToken() y getUserDetailsFromToken() para usar la lógica personalizada.
    */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user'; // Importa la interfaz de usuario
import { Userlog } from '../models/userlog'; // Importa la interfaz para el login

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private apiUrl = 'http://localhost:3000/api'; // URL base de tu API
// API_URI = 'http://localhost:3000/api';
apiUrl = 'https://psag2.onrender.com/api';
  constructor(private http: HttpClient) {}

  /**
   * Decodifica manualmente un token JWT.
   * @param token El token JWT a decodificar.
   * @returns El payload decodificado o null si ocurre un error.
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

  // ----------------------- MÉTODOS RELACIONADOS CON USUARIOS -----------------------

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/login`);
  }

  getPsychologists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/psychologists`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/login/${id}`);
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/login/${id}`, user);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login/`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/login/${id}`);
  }

  createUserByAdmin(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user`, user);
  }

  getPsychologistsAndSendEmail(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/user/psychologists/send-email`);
}

    loginUser(userlog: Userlog): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login/login`, userlog);
  }

  // ----------------------- MÉTODOS RELACIONADOS CON AUTENTICACIÓN -----------------------

  /**
   * Obtiene el ID del usuario decodificando el token JWT almacenado en localStorage.
   * @returns El ID del usuario si se encuentra el token, o null si no existe.
   */
  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token no encontrado');
      return null;
    }
    const decodedToken = this.decodeJWT(token);
    if (!decodedToken) {
      console.error('No se pudo decodificar el token.');
      return null;
    }
    const userId = decodedToken['id'];
    console.log('ID de usuario extraído del token:', userId);
    return userId;
  }

  /**
   * Obtiene detalles del usuario como ID y rol decodificando el token JWT.
   * @returns Un objeto con `id_usuario` y `id_rol` si el token es válido, o null si no lo es.
   */
  getUserDetailsFromToken(): { id_usuario: number; id_rol: number } | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token no encontrado');
      return null;
    }
    const decodedToken = this.decodeJWT(token);
    if (!decodedToken) {
      console.error('No se pudo decodificar el token.');
      return null;
    }
    const userId = decodedToken['id'];
    const userRole = decodedToken['rol'];
    console.log('ID de usuario:', userId, 'Rol de usuario:', userRole);
    return { id_usuario: userId, id_rol: userRole };
  }

  getUserProfile(): Observable<User> {
    const userId = this.getUserIdFromToken();
    if (userId !== null) {
      return this.getUserById(userId);
    } else {
      throw new Error('No se pudo obtener el ID de usuario desde el token.');
    }
  }

  getCarreras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/carreras`);
  }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/roles`);
  }
}
