import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private endpointShow = "https://api.spotify.com/v1/shows/";

  constructor(private http: HttpClient) { }


  getShow(accessToken: string, showId: string, market: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    // Construir la URL con el ID del show y el mercado
    const url = `${this.endpointShow}${showId}?market=${market}`;
    return this.http.get(url, { headers });
  }
}
