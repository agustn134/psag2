// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { User } from '../models/user'; // Importa la interfaz
// import { Userlog } from '../models/userlog';
// import { decode } from 'jwt-js-decode';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private apiUrl = 'http://localhost:3000/api'; // URL de tu API

//   constructor(private http: HttpClient) {}

//   // Método para obtener todos los usuarios
//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(`${this.apiUrl}/login`);
//   }

//   // Método para obtener un usuario por ID
//   getUserById(id: number): Observable<User> {
//     return this.http.get<User>(`${this.apiUrl}/login/${id}`);
//   }

//   saveUser(user: User): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/login`, user);
//   }

//   // Método para actualizar un usuario
//   updateUser(id: number, user: User): Observable<User> {
//     return this.http.put<User>(`${this.apiUrl}/login/${id}`, user);
//   }

//   // Método para crear un nuevo usuario
//   createUser(user: User): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/login/`, user);
//   }

//   deleteUser(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/user/${id}`);
//   }

//   createUserByAdmin(user: User): Observable<User> {
//     return this.http.post<User>(`${this.apiUrl}/user`, user);
//   }

//   // Método para crear un nuevo usuario  string es para el token
//   loginUser(userlog: Userlog): Observable<string> {
//     return this.http.post<string>(`${this.apiUrl}/login/login`, userlog);
//   }

//   getUserIdFromToken(): number | null {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.log('Token no encontrado');
//       return null;
//     }

//     try {
//       const decodedToken = decode(token);
//       const userId = decodedToken.payload['id']; // Verifica si 'id' es el campo correcto
//       return userId;
//     } catch (error) {
//       console.error('Error al decodificar el token:', error);
//       return null;
//     }
//   }

//   getUserProfile(): Observable<User> {
//     const userId = this.getUserIdFromToken();
//     if (userId !== null) {
//       return this.getUserById(userId);
//     } else {
//       throw new Error('No se pudo obtener el ID de usuario desde el token.');
//     }
//   }



// }








import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user'; // Importa la interfaz de usuario
import { Userlog } from '../models/userlog'; // Importa la interfaz para el login
import { decode } from 'jwt-js-decode'; // Importa para decodificar el token JWT

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api'; // URL base de tu API

  constructor(private http: HttpClient) {}

  // ----------------------- MÉTODOS RELACIONADOS CON USUARIOS -----------------------

  /**
   * Obtiene todos los usuarios de la API.
   * @returns Un Observable que emite una lista de usuarios (User[]).
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/login`);
  }

  /**
   * Obtiene un usuario por su ID desde la API.
   * @param id El ID del usuario que se desea obtener.
   * @returns Un Observable que emite un usuario (User).
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/login/${id}`);
  }

  /**
   * Guarda un nuevo usuario en la base de datos a través de la API.
   * @param user El objeto de tipo User que se va a guardar.
   * @returns Un Observable que emite el usuario guardado (User).
   */
  saveUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, user);
  }

  /**
   * Actualiza los datos de un usuario existente.
   * @param id El ID del usuario que se va a actualizar.
   * @param user El objeto de tipo User con los datos actualizados.
   * @returns Un Observable que emite el usuario actualizado (User).
   */
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/login/${id}`, user);
  }

  /**
   * Crea un nuevo usuario (función alternativa a saveUser).
   * @param user El objeto de tipo User que se va a crear.
   * @returns Un Observable que emite el usuario creado (User).
   */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login/`, user);
  }

  /**
   * Elimina un usuario según su ID.
   * @param id El ID del usuario que se va a eliminar.
   * @returns Un Observable que emite void (sin valor de retorno).
   */
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/login/${id}`);
  }

  /**
   * Método específico para que el administrador cree un nuevo usuario.
   * @param user El objeto de tipo User que se va a crear.
   * @returns Un Observable que emite el usuario creado (User).
   */
  createUserByAdmin(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/user`, user);
  }

  // ----------------------- MÉTODOS RELACIONADOS CON AUTENTICACIÓN -----------------------

  /**
   * Realiza el login del usuario, devolviendo un token JWT.
   * @param userlog Objeto de tipo Userlog que contiene las credenciales de inicio de sesión.
   * @returns Un Observable que emite un string (el token JWT).
   */
  loginUser(userlog: Userlog): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login/login`, userlog);
  }

  /**
   * Obtiene el ID del usuario decodificando el token JWT almacenado en el localStorage.
   * @returns El ID del usuario si se encuentra el token, o null si no existe.
   */
  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('Token no encontrado');
      return null;
    }

    try {
      const decodedToken = decode(token);
      const userId = decodedToken.payload['id']; // Verifica si 'id' es el campo correcto
      return userId;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  /**
   * Obtiene el perfil del usuario autenticado usando su ID extraído del token.
   * @returns Un Observable que emite el objeto User del usuario autenticado.
   */
  getUserProfile(): Observable<User> {
    const userId = this.getUserIdFromToken();
    if (userId !== null) {
      return this.getUserById(userId);
    } else {
      throw new Error('No se pudo obtener el ID de usuario desde el token.');
    }
  }


}
