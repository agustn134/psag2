import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyAuthService } from '../../services/spotify-auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private spotifyAuthService: SpotifyAuthService, private router: Router) { }

  ngOnInit(): void {
    // Obtener el código de la URL
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      if (code) {
        // Intercambiar el código por el token de acceso
        this.spotifyAuthService.getToken(code).subscribe((response: any) => {
          console.log('Token de acceso:', response);

          // Guardar el token de acceso en localStorage
          // const accessToken = response.access_token;
          // localStorage.setItem('spotify_access_token', accessToken);
          const accessToken = response.access_token;
          if (accessToken) {
          localStorage.setItem('spotify_access_token', accessToken);
          console.log('Access token guardado en localStorage.');
          } else {
            console.error('Access token no recibido.');
          }

          // Redirigir a la página principal o donde prefieras
          this.router.navigate(['/plus-psychology']);
        }, (error) => {
          console.error('Error al obtener el token:', error);
        });
      } else {
        console.error('No se recibió el código de autorización');
      }
    });
  }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     const code = params['code'];
  //     if (code) {
  //       this.spotifyAuthService.getToken(code).subscribe((response: any) => {
  //         const accessToken = response.access_token;
  //         localStorage.setItem('spotify_access_token', accessToken);
  //         console.log('Token de acceso:', accessToken);
  //         this.router.navigate(['/plus-psychology']);
  //       }, (error) => {
  //         console.error('Error al obtener el token:', error);
  //       });
  //     } else {
  //       console.error('No se recibió el código de autorización');
  //     }
  //   });
  // }



}
