import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  private clientId = 'cee7409563be42d9bc1585a608bf1bf1'; // Tu Client ID
  private clientSecret = 'b57892cfd87c4fc183dc033740dc4dc1'; // Tu Client Secret
  private redirectUri = 'http://localhost:4200/callback'; // Asegúrate de que esté registrado en Spotify Dev
  private authEndpoint = 'https://accounts.spotify.com/authorize';
  private tokenEndpoint = 'https://accounts.spotify.com/api/token';
  private scope = 'user-read-private user-read-email'; // Aquí puedes agregar más scopes si necesitas

  constructor(private http: HttpClient) {}

  // Método para iniciar el proceso de login
  login(): void {
    const state = this.generateRandomString(16);
    const authUrl = `${this.authEndpoint}?client_id=${this.clientId}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(this.scope)}&state=${state}`;

    window.location.href = authUrl; // Redirige al usuario a la página de autorización de Spotify
  }

  // Intercambiar el código por el access token
  getToken(code: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    return this.http.post(this.tokenEndpoint, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
  }

  // Obtener un token de acceso utilizando el flujo de Client Credentials
  getClientCredentialsToken(): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', 'client_credentials');

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    return this.http.post(this.tokenEndpoint, body.toString(), { headers });
  }

  // Obtener categorías
  getCategories(accessToken: string): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${accessToken}`
    };

    return this.http.get('https://api.spotify.com/v1/browse/categories', { headers });
  }

  // Generador de estado aleatorio para seguridad
  private generateRandomString(length: number): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
