import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user'; // Importa la interfaz
import { Userlog } from '../models/userlog';
import { decode } from 'jwt-js-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/login`);
  }

  // Método para obtener un usuario por ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/login/${id}`);
  }

  // Método para actualizar un usuario
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/login/${id}`, user);
  }

  // Método para eliminar un usuario
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/login/${id}`);
  }

  // Método para crear un nuevo usuario
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login/`, user);
  }

  // Método para crear un nuevo usuario  string es para el token
  loginUser(userlog: Userlog): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login/login`, userlog);
  }
  // http://localhost:3000/api/login/login

  // Método para obtener del token desde el localstorage, decodificar el token y obetener el ID del usuario
  // Método para obtener el ID de usuario del token almacenado en localStorage
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


  // Método para obtener el perfil del usuario autenticado
getUserProfile(): Observable<User> {
  const userId = this.getUserIdFromToken();
  if (userId !== null) {
    return this.getUserById(userId); // Utiliza el método ya existente para obtener un usuario por ID
  } else {
    throw new Error("No se pudo obtener el ID de usuario desde el token.");
  }
}




}















