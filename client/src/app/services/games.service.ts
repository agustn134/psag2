import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game} from '../models/game'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  // API_URI = 'http://localhost:3000/api';
  API_URI = 'https://psag2.onrender.com/api';

  constructor( private http: HttpClient) {}



  // Tipar la respuesta como Observable de Game[]
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.API_URI}/games`);
  }

  // Tipar la respuesta como Observable de un solo Game
  getGame(id: string): Observable<Game> {
    return this.http.get<Game>(`${this.API_URI}/games/${id}`);
  }

  saveGame(game: Game): Observable<Game> {
    return this.http.post<Game>(`${this.API_URI}/games`, game);
  }

  // El tipo de retorno es Observable de Game
  updateGame(id: string | Number, updateGame: Game): Observable<Game> {
    return this.http.put<Game>(`${this.API_URI}/games/${id}`, updateGame);
  }

  deleteGame(id: string | Number): Observable<void> {
    return this.http.delete<void>(`${this.API_URI}/games/${id}`);
  }
}


