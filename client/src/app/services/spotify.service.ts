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

  // spotify.service.ts
getCategoryPlaylists(accessToken: string, categoryId: string, market: string): Observable<any> {
  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };
  const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?market=${market}`;
  return this.http.get(url, { headers });
}

//Listado de Episodios
getEpisodes(accessToken: string, showId: string, market: string): Observable<any> {
  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };
  const url = `https://api.spotify.com/v1/shows/${showId}/episodes?market=${market}`;
  return this.http.get(url, { headers });
}

play(accessToken: string, body: any): Observable<any> {
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  };

  return this.http.put('https://api.spotify.com/v1/me/player/play', body, { headers });
}

pause(accessToken: string): Observable<any> {
  const headers = { 'Authorization': `Bearer ${accessToken}` };

  return this.http.put('https://api.spotify.com/v1/me/player/pause', {}, { headers });
}

skipToNext(accessToken: string): Observable<any> {
  const headers = { 'Authorization': `Bearer ${accessToken}` };

  return this.http.post('https://api.spotify.com/v1/me/player/next', {}, { headers });
}

}
