import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private endpointShow = "https://api.spotify.com/v1/shows/";
  private apiUrl = 'https://api.spotify.com/v1/me/player';
  private accessToken = 'b57892cfd87c4fc183dc033740dc4dc1'; //

  constructor(private http: HttpClient) { }

  getShow(accessToken: string, showId: string, market: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    const url = `${this.endpointShow}${showId}?market=${market}`;
    return this.http.get(url, { headers });
  }

  getCategoryPlaylists(accessToken: string, categoryId: string, market: string): Observable<any> {
  const headers = {
    'Authorization': `Bearer ${accessToken}`
  };
  const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?market=${market}`;
  return this.http.get(url, { headers });
  }

  setActiveDevice(deviceId: string, accessToken: string) {
    const body = { device_ids: [deviceId], play: true };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.put('https://api.spotify.com/v1/me/player', body, { headers });
  }


  getEpisodes(accessToken: string, showId: string, market: string): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };
    const url = `https://api.spotify.com/v1/shows/${showId}/episodes?market=${market}`;
    return this.http.get(url, { headers });
  }

  getPlaybackState() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`
    });

    return this.http.get(this.apiUrl, { headers });
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

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SpotifyService {
//   private endpointShow = "https://api.spotify.com/v1/shows/";
//   private apiUrl = 'https://api.spotify.com/v1/me/player';

//   constructor(private http: HttpClient) { }

//   // Función para obtener el token de acceso desde localStorage
//   private getAccessToken(): string | null {
//     return localStorage.getItem('access_token'); // Devuelve el token de localStorage
//   }

//   // Método para obtener un show
//   getShow(showId: string, market: string): Observable<any> {
//     const accessToken = this.getAccessToken();
//     if (!accessToken) {
//       throw new Error('Access token no encontrado');
//     }
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${accessToken}`
//     });
//     const url = `${this.endpointShow}${showId}?market=${market}`;
//     return this.http.get(url, { headers });
//   }

//   // Método para obtener playlists de una categoría
//   getCategoryPlaylists(categoryId: string, market: string): Observable<any> {
//     const accessToken = this.getAccessToken();
//     if (!accessToken) {
//       throw new Error('Access token no encontrado');
//     }
//     const headers = {
//       'Authorization': `Bearer ${accessToken}`
//     };
//     const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?market=${market}`;
//     return this.http.get(url, { headers });
//   }

//   // Configura el dispositivo activo
//   setActiveDevice(deviceId: string): Observable<any> {
//     const accessToken = this.getAccessToken();
//     if (!accessToken) {
//       throw new Error('Access token no encontrado');
//     }
//     const body = { device_ids: [deviceId], play: true };
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${accessToken}`,
//       'Content-Type': 'application/json'
//     });
//     return this.http.put('https://api.spotify.com/v1/me/player', body, { headers });
//   }

//   // Obtener episodios de un show
//   getEpisodes(showId: string, market: string): Observable<any> {
//     const accessToken = this.getAccessToken();
//     if (!accessToken) {
//       throw new Error('Access token no encontrado');
//     }
//     const headers = {
//       'Authorization': `Bearer ${accessToken}`
//     };
//     const url = `https://api.spotify.com/v1/shows/${showId}/episodes?market=${market}`;
//     return this.http.get(url, { headers });
//   }

//   // Obtener estado de la reproducción
//   getPlaybackState(): Observable<any> {
//     const accessToken = this.getAccessToken();
//     if (!accessToken) {
//       throw new Error('Access token no encontrado');
//     }
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${accessToken}`
//     });
//     return this.http.get(this.apiUrl, { headers });
//   }

//   // Reproducir
//   play(body: any): Observable<any> {
//     const accessToken = this.getAccessToken();
//     if (!accessToken) {
//       throw new Error('Access token no encontrado');
//     }
//     const headers = {
//       'Authorization': `Bearer ${accessToken}`,
//       'Content-Type': 'application/json'
//     };
//     return this.http.put('https://api.spotify.com/v1/me/player/play', body, { headers });
//   }

//   // Pausar
//   pause(): Observable<any> {
//     const accessToken = this.getAccessToken();
//     if (!accessToken) {
//       throw new Error('Access token no encontrado');
//     }
//     const headers = { 'Authorization': `Bearer ${accessToken}` };
//     return this.http.put('https://api.spotify.com/v1/me/player/pause', {}, { headers });
//   }

//   // Saltar a la siguiente pista
//   skipToNext(): Observable<any> {
//     const accessToken = this.getAccessToken();
//     if (!accessToken) {
//       throw new Error('Access token no encontrado');
//     }
//     const headers = { 'Authorization': `Bearer ${accessToken}` };
//     return this.http.post('https://api.spotify.com/v1/me/player/next', {}, { headers });
//   }
// }
