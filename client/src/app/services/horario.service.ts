import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Horario} from '../models/horario'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  // API_URI = 'http://localhost:3000/api';
  API_URI = 'https://psag2.onrender.com/api';
  constructor(private http: HttpClient) { }

  // Tipar la respuesta como Observable de Consultorio[]
  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.API_URI}/horarios`);
  }

}
