// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class SpotifyService {
//   // private endpointShow = "https://api.spotify.com/v1/shows/";
//   // private apiUrl = 'https://api.spotify.com/v1/me/player';
//   // private clientId = 'cee7409563be42d9bc1585a608bf1bf1';
//   // private clientSecret = 'b57892cfd87c4fc183dc033740dc4dc1';
//   // private redirectUri = 'https://localhost:4200/callback'; // URL registrada en Spotify Dev
//   // private authEndpoint = 'https://accounts.spotify.com/authorize';
//   // private tokenEndpoint = 'https://accounts.spotify.com/api/token';
//   // private scope = 'user-read-private user-read-email user-library-read streaming user-modify-playback-state';

//   public credentias = {

//     clientIdent: 'cee7409563be42d9bc1585a608bf1bf1',
//     clientSecret: 'b57892cfd87c4fc183dc033740dc4dc1',
//     redirectUri: 'http://localhost:4200/callback',
//     scope: 'user-read-private user-read-email user-library-read streaming user-modify-playback-state',
//     tokenType: 'Bearer',
//     accessToken: '',
//     refreshToken: ''
//   }



//   public poolURIS ={
//     authorize: 'https://accounts.spotify.com/as-ES/authorize?=' +
//       this.credentials.clientIdent + '&response_type=token' +
//       '&redirect_uri-' + encodeURIComponent('http://localhost:4200/callback') +
//       '&expires_in=3600',
//       refreshAccessToken: 'https://accounts.spotify.com/api/token'
//   };


//   constructor(private http: HttpClient) {
//     this.upDateToken()
//   }

//   upDateToken(){
//     this.credentials.accessToken = sessionStorage.getItem('token') || '';
//    }

//    getQuery(query: string){
//      const URL = 'https://api.spotify.com/v1/${query}';
//      const HEADER = {header: new HttpHeaders({'Authorization': 'Bearer ' + this.credentials.accessToken})};

//      return this.http.get(URL, HEADER);
//    }

//    checkTokenSpoLogin(){

//     this.checkTokenSpo() || (sessionStorage.setItem('refererURL',location.href), window.location.href = this.poolURIS.authorize);

//    }

//    checkTokenSpo(){
//      return !!this.credentials.accessToken;
//    }


//    tokenRefreshURL(){

//     this.checkTokenSpo() && alert('Expiro la sesion');

//     this.credentials.accessToken = '';
//     sessionStorage.removeItem('token');
//     this.checkTokenSpoLogin();

//    }

//    getShow(id: string) {
//     return this.getQuery(`shows/${id}`);
//    }





// }
























// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { Observable } from 'rxjs';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class SpotifyService {

// //   private endpointShow = "https://api.spotify.com/v1/shows/";
// //   private apiUrl = 'https://api.spotify.com/v1/me/player';
// //   private accessToken = 'b57892cfd87c4fc183dc033740dc4dc1';

// //   constructor(private http: HttpClient) { }

// //   // Función para obtener el token de acceso desde localStorage
// //   private getAccessToken(): string | null {
// //     return localStorage.getItem('access_token'); // Devuelve el token de localStorage
// //   }

// //   // Método para obtener un show
// //   getShow(showId: string, market: string): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = new HttpHeaders({
// //       'Authorization': `Bearer ${accessToken}`
// //     });
// //     const url = `${this.endpointShow}${showId}?market=${market}`;
// //     return this.http.get(url, { headers });
// //   }

// //   // Método para obtener playlists de una categoría
// //   getCategoryPlaylists(categoryId: string, market: string): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = {
// //       'Authorization': `Bearer ${accessToken}`
// //     };
// //     const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?market=${market}`;
// //     return this.http.get(url, { headers });
// //   }

// //   // Configura el dispositivo activo
// //   setActiveDevice(deviceId: string): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const body = { device_ids: [deviceId], play: true };
// //     const headers = new HttpHeaders({
// //       Authorization: `Bearer ${accessToken}`,
// //       'Content-Type': 'application/json'
// //     });
// //     return this.http.put('https://api.spotify.com/v1/me/player', body, { headers });
// //   }

// //   // Obtener episodios de un show
// //   getEpisodes(showId: string, market: string): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = {
// //       'Authorization': `Bearer ${accessToken}`
// //     };
// //     const url = `https://api.spotify.com/v1/shows/${showId}/episodes?market=${market}`;
// //     return this.http.get(url, { headers });
// //   }

// //   // Obtener estado de la reproducción
// //   getPlaybackState(): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = new HttpHeaders({
// //       Authorization: `Bearer ${accessToken}`
// //     });
// //     return this.http.get(this.apiUrl, { headers });
// //   }

// //   // Reproducir
// //   play(body: any): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = {
// //       'Authorization': `Bearer ${accessToken}`,
// //       'Content-Type': 'application/json'
// //     };
// //     return this.http.put('https://api.spotify.com/v1/me/player/play', body, { headers });
// //   }

// //   // Pausar
// //   pause(): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = { 'Authorization': `Bearer ${accessToken}` };
// //     return this.http.put('https://api.spotify.com/v1/me/player/pause', {}, { headers });
// //   }

// //   // Saltar a la siguiente pista
// //   skipToNext(): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = { 'Authorization': `Bearer ${accessToken}` };
// //     return this.http.post('https://api.spotify.com/v1/me/player/next', {}, { headers });
// //   }
// // }








































































// // // spotify.service.ts
// // import { Injectable } from '@angular/core';
// // import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { Observable } from 'rxjs';

// // @Injectable({
// //   providedIn: 'root',
// // })
// // export class SpotifyService {
// //   private endpointShow = 'https://api.spotify.com/v1/shows/';
// //   private apiUrl = 'https://api.spotify.com/v1/me/player';

// //   constructor(private http: HttpClient) {}

// //   private getAccessToken(): string | null {
// //     return localStorage.getItem('access_token');
// //   }

// //   getShow(showId: string, market: string): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = new HttpHeaders({
// //       'Authorization': `Bearer ${accessToken}`,
// //     });
// //     const url = `${this.endpointShow}${showId}?market=${market}`;
// //     return this.http.get(url, { headers });
// //   }

// //   getCategoryPlaylists(categoryId: string, market: string): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = {
// //       'Authorization': `Bearer ${accessToken}`,
// //     };
// //     const url = `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?market=${market}`;
// //     return this.http.get(url, { headers });
// //   }

// //   setActiveDevice(deviceId: string): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const body = { device_ids: [deviceId], play: true };
// //     const headers = new HttpHeaders({
// //       'Authorization': `Bearer ${accessToken}`,
// //       'Content-Type': 'application/json',
// //     });
// //     return this.http.put('https://api.spotify.com/v1/me/player', body, { headers });
// //   }

// //   getEpisodes(showId: string, market: string): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = {
// //       'Authorization': `Bearer ${accessToken}`,
// //     };
// //     const url = `https://api.spotify.com/v1/shows/${showId}/episodes?market=${market}`;
// //     return this.http.get(url, { headers });
// //   }

// //   getPlaybackState(): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = new HttpHeaders({
// //       'Authorization': `Bearer ${accessToken}`,
// //     });
// //     return this.http.get(this.apiUrl, { headers });
// //   }

// //   play(body: any): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = {
// //       'Authorization': `Bearer ${accessToken}`,
// //       'Content-Type': 'application/json',
// //     };
// //     return this.http.put('https://api.spotify.com/v1/me/player/play', body, { headers });
// //   }

// //   pause(): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = { 'Authorization': `Bearer ${accessToken}` };
// //     return this.http.put('https://api.spotify.com/v1/me/player/pause', {}, { headers });
// //   }

// //   skipToNext(): Observable<any> {
// //     const accessToken = this.getAccessToken();
// //     if (!accessToken) {
// //       throw new Error('Access token no encontrado');
// //     }
// //     const headers = { 'Authorization': `Bearer ${accessToken}` };
// //     return this.http.post('https://api.spotify.com/v1/me/player/next', {}, { headers });
// //   }
// // }




























































































// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SpotifyService {
//   // Credenciales y configuración
//   private credentials = {
//     clientId: 'cee7409563be42d9bc1585a608bf1bf1',
//     clientSecret: 'b57892cfd87c4fc183dc033740dc4dc1',
//     redirectUri: 'http://localhost:4200/callback',
//     scope: 'user-read-private user-read-email user-library-read streaming user-modify-playback-state',
//     accessToken: '',
//   };

//   private poolURIS = {
//     authorize: `https://accounts.spotify.com/authorize?client_id=${this.credentials.clientId}&response_type=token&redirect_uri=${encodeURIComponent(this.credentials.redirectUri)}&scope=${encodeURIComponent(this.credentials.scope)}`,
//     refreshToken: 'https://accounts.spotify.com/api/token',
//   };

//   constructor(private http: HttpClient) {
//     this.updateToken();
//   }

//   /**
//    * Actualiza el token desde el sessionStorage.
//    */
//   private updateToken(): void {
//     this.credentials.accessToken = sessionStorage.getItem('token') || '';
//   }

//   /**
//    * Realiza una consulta a la API de Spotify.
//    * @param query Ruta del recurso en la API.
//    * @returns Observable con la respuesta de la API.
//    */
//   private getQuery(query: string): Observable<any> {
//     const url = `https://api.spotify.com/v1/${query}`;
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.credentials.accessToken}`,
//     });

//     return this.http.get(url, { headers });
//   }

//   /**
//    * Verifica si el usuario está autenticado.
//    * Si no lo está, redirige al proceso de autenticación.
//    */
//   public checkTokenSpoLogin(): void {
//     if (!this.isLoggedIn()) {
//       sessionStorage.setItem('refererURL', location.href);
//       window.location.href = this.poolURIS.authorize;
//     }
//   }

//   /**
//    * Verifica si el token de acceso está disponible.
//    * @returns `true` si hay un token válido, `false` en caso contrario.
//    */
//   private isLoggedIn(): boolean {
//     return !!this.credentials.accessToken;
//   }

//   /**
//    * Maneja el caso en que el token haya expirado.
//    * Limpia el token y redirige al proceso de autenticación.
//    */
//   public handleTokenExpiration(): void {
//     if (this.isLoggedIn()) {
//       alert('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
//     }
//     this.credentials.accessToken = '';
//     sessionStorage.removeItem('token');
//     this.checkTokenSpoLogin();
//   }

//   /**
//    * Obtiene información de un show en Spotify.
//    * @param id ID del show.
//    * @returns Observable con la información del show.
//    */
//   public getShow(id: string): Observable<any> {
//     return this.getQuery(`shows/${id}`);
//   }

//   // Otros métodos (por ejemplo, getEpisodes, getPlaybackState, etc.) pueden añadirse aquí
// }



































import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  // Credenciales y configuración
  private credentials = {
    clientId: 'cee7409563be42d9bc1585a608bf1bf1',
    clientSecret: 'b57892cfd87c4fc183dc033740dc4dc1',
    redirectUri: 'https://psicoaguilasedu.web.app/callback',
    scope: 'user-read-private user-read-email user-library-read streaming user-modify-playback-state',
    accessToken: '',
  };

  private poolURIS = {
    authorize: `https://accounts.spotify.com/authorize?client_id=${this.credentials.clientId}&response_type=token&redirect_uri=${encodeURIComponent(this.credentials.redirectUri)}&scope=${encodeURIComponent(this.credentials.scope)}`,
    refreshToken: 'https://accounts.spotify.com/api/token',
  };

  constructor(private http: HttpClient) {
    this.updateToken();
  }

  /**
   * Actualiza el token desde el sessionStorage.
   */
  private updateToken(): void {
    this.credentials.accessToken = sessionStorage.getItem('token') || '';
  }

  /**
   * Realiza una consulta a la API de Spotify.
   * @param query Ruta del recurso en la API.
   * @returns Observable con la respuesta de la API.
   */
  private getQuery(query: string): Observable<any> {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.credentials.accessToken}`,
    });

    return this.http.get(url, { headers });
  }

  /**
   * Verifica si el usuario está autenticado.
   * Si no lo está, redirige al proceso de autenticación.
   */
  public checkTokenSpoLogin(): void {
    if (!this.isLoggedIn()) {
      sessionStorage.setItem('refererURL', location.href);
      window.location.href = this.poolURIS.authorize;
    }
  }

  /**
   * Verifica si el token de acceso está disponible.
   * @returns `true` si hay un token válido, `false` en caso contrario.
   */
  private isLoggedIn(): boolean {
    return !!this.credentials.accessToken;
  }

  /**
   * Maneja el caso en que el token haya expirado.
   * Limpia el token y redirige al proceso de autenticación.
   */
  public handleTokenExpiration(): void {
    if (this.isLoggedIn()) {
      alert('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
    }
    this.credentials.accessToken = '';
    sessionStorage.removeItem('token');
    this.checkTokenSpoLogin();
  }

  /**
   * Obtiene información de un show en Spotify.
   * @param id ID del show.
   * @returns Observable con la información del show.
   */
  public getShow(id: string): Observable<any> {
    return this.getQuery(`shows/${id}`);
  }

  /**
   * Obtiene los episodios de un show.
   * @param showId ID del show.
   * @param market Mercado (país) para obtener contenido disponible.
   * @returns Observable con los episodios del show.
   */
  // Obtener episodios de un show
public getEpisodes(showId: string, market: string): Observable<any> {
  const query = `shows/${showId}/episodes?market=${market}`;
  return this.getQuery(query);
}

  /**
   * Establece un dispositivo activo para reproducción.
   * @param deviceId ID del dispositivo.
   * @param accessToken Token de acceso del usuario.
   * @returns Observable con el resultado de la operación.
   */
  public setActiveDevice(deviceId: string, accessToken: string): Observable<any> {
    const url = `https://api.spotify.com/v1/me/player`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.put(url, { device_ids: [deviceId], play: false }, { headers });
  }



  /**
   * Reproduce una pista o episodio.
   * @param accessToken Token de acceso del usuario.
   * @param body Cuerpo de la petición (URIs de pistas/episodios).
   * @returns Observable con el resultado de la operación.
   */
  public play(accessToken: string, body: any): Observable<any> {
    const url = `https://api.spotify.com/v1/me/player/play`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.put(url, body, { headers });
  }

  /**
   * Pausa la reproducción.
   * @param accessToken Token de acceso del usuario.
   * @returns Observable con el resultado de la operación.
   */
  public pause(accessToken: string): Observable<any> {
    const url = `https://api.spotify.com/v1/me/player/pause`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
    });

    return this.http.put(url, {}, { headers });
  }

  /**
   * Salta a la siguiente pista.
   * @param accessToken Token de acceso del usuario.
   * @returns Observable con el resultado de la operación.
   */
  public skipToNext(accessToken: string): Observable<any> {
    const url = `https://api.spotify.com/v1/me/player/next`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
    });

    return this.http.post(url, {}, { headers });
  }




  public getAvailableDevices(accessToken: string): Observable<any> {
    const url = 'https://api.spotify.com/v1/me/player/devices';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(url, { headers });
  }



}
