import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultorio} from '../models/consultorio'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {

  API_URI = 'http://localhost:3000/api';

  constructor( private http: HttpClient) {}

  // Tipar la respuesta como Observable de Consultorio[]
  getConsultorios(): Observable<Consultorio[]> {
    return this.http.get<Consultorio[]>(`${this.API_URI}/consultorios`);
  }

  // Tipar la respuesta como Observable de un solo Consultorio
  getConsultorio(id: string): Observable<Consultorio> {
    return this.http.get<Consultorio>(`${this.API_URI}/consultorios/${id}`);
  }

  deleteConsultorio(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URI}/consultorios/${id}`);
  }

  saveConsultorio(consultorio: Consultorio): Observable<Consultorio> {
    return this.http.post<Consultorio>(`${this.API_URI}/consultorios`, consultorio);
  }

  // El tipo de retorno es Observable de Consultorio
  updateConsultorio(id: string, updateConsultorio: Consultorio): Observable<Consultorio> {
    return this.http.put<Consultorio>(`${this.API_URI}/consultorios/${id}`, updateConsultorio);
  }


}
