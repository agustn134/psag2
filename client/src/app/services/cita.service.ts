import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cita } from '../models/cita';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Obtener todas las citas
  getCitas(): Observable<cita[]> {
    return this.http.get<cita[]>(`${this.API_URI}/citas`);
  }

  // Obtener una cita por ID
  getCita(id: string): Observable<cita> {
    return this.http.get<cita>(`${this.API_URI}/citas/${id}`);
  }

  // Obtener citas por id_alumno
getCitasByAlumno(id_alumno: number): Observable<cita[]> {
  return this.http.get<cita[]>(`${this.API_URI}/citas/alumno/${id_alumno}`);
}

// Obtener citas por id_psicologo
getCitasByPsicologo(id_psicologo: number): Observable<cita[]> {
  return this.http.get<cita[]>(`${this.API_URI}/citas/psicologo/${id_psicologo}`);
}


  // Eliminar una cita
  deleteCita(id: string): Observable<any> {
    // Cambiado a any si deseas respuesta del servidor
    return this.http.delete<any>(`${this.API_URI}/citas/${id}`);
  }

  // Guardar una nueva cita
  saveCita(cita: cita): Observable<cita> {
    // Cambiado de consultorio a cita
    return this.http.post<cita>(`${this.API_URI}/citas/`, cita);
  }

  // Actualizar una cita existente
  updateCita(id: string, updateCita: cita): Observable<cita> {
    return this.http.put<cita>(`${this.API_URI}/citas/${id}`, updateCita);
  }

  // Método de actualización del estado
  updateEstatus(id: string, estatus: string): Observable<any> {
  return this.http.put<any>(`${this.API_URI}/citas/${id}/status`, { estatus });
  }

}
