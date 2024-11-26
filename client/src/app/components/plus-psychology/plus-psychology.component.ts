import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../../services/spotify-auth.service';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-plus-psychology',
  templateUrl: './plus-psychology.component.html',
  styleUrls: ['./plus-psychology.component.css']
})
export class PlusPsychologyComponent implements OnInit {
  showDetails: any;
  episodes: any[] = [];

  private showId = '0sGGLIDnnijRPLef7InllD';
  private market = 'ES';

  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.loadShow();
    this.loadEpisodes();
    this.spotifyAuthService.getClientCredentialsToken().subscribe((tokenResponse: any) => {
    const accessToken = tokenResponse.access_token;
    });
  }

  loadShow(): void {
    this.spotifyAuthService.getClientCredentialsToken().subscribe({
      next: (tokenResponse: any) => {
        const accessToken = tokenResponse.access_token;
        this.spotifyService.getShow(accessToken, this.showId, this.market).subscribe({
          next: (showData: any) => this.showDetails = showData,
          error: (err) => console.error('Error al cargar los detalles del show:', err)
        });
      },
      error: (err) => console.error('Error al obtener el token:', err)
    });
  }


  loadEpisodes(): void {
    this.spotifyAuthService.getClientCredentialsToken().subscribe((tokenResponse: any) => {
      const accessToken = tokenResponse.access_token;
      this.spotifyService.getEpisodes(accessToken, this.showId, this.market).subscribe((episodeData: any) => {
        this.episodes = episodeData.items;
      });
    });
  }


  // play(): void {
  //   const deviceId = localStorage.getItem('spotify_device_id');
  //   const accessToken = localStorage.getItem('spotify_access_token');

  //   if (deviceId && accessToken) {
  //     this.spotifyService.setActiveDevice(deviceId, accessToken).subscribe(() => {
  //       const body = {
  //         uris: ['spotify:track:3jRUDbIgoYdvPGwWsI7b7Y']
  //       };

  //       this.spotifyService.play(accessToken, body).subscribe(
  //         () => {
  //           console.log('Reproducción iniciada');
  //         },
  //         (error) => {
  //           console.error('Error al iniciar la reproducción:', error);
  //         }
  //       );
  //     });
  //   } else {
  //     console.error('Faltan device_id o access_token en localStorage');
  //   }
  // }

  play(): void {
    const deviceId = localStorage.getItem('spotify_device_id');
    const accessToken = localStorage.getItem('spotify_access_token');

    if (deviceId && accessToken) {
      this.spotifyService.setActiveDevice(deviceId, accessToken).subscribe(() => {
        const body = {
          uris: ['spotify:track:3jRUDbIgoYdvPGwWsI7b7Y']
        };

        this.spotifyService.play(accessToken, body).subscribe(
          () => {
            console.log('Reproducción iniciada');
          },
          (error) => {
            console.error('Error al iniciar la reproducción:', error);
          }
        );
      });
    } else {
      console.error('Faltan device_id o access_token en localStorage');
    }
  }





  playEpisode(episodeUri: string): void {
    const deviceId = localStorage.getItem('spotify_device_id');
    const accessToken = localStorage.getItem('spotify_access_token');

    if (deviceId && accessToken && episodeUri) {
      const body = {
        device_id: deviceId,
        uris: [episodeUri]
      };

      this.spotifyService.play(accessToken, body).subscribe(() => {
        console.log(`Reproduciendo episodio: ${episodeUri}`);
      });
    }
  }

  pause(): void {
    const accessToken = localStorage.getItem('spotify_access_token');
    if (accessToken) {
      this.spotifyService.pause(accessToken).subscribe(() => {
        console.log('Reproducción pausada');
      });
    }
  }

  skipNext(): void {
    const accessToken = localStorage.getItem('spotify_access_token');
    if (accessToken) {
      this.spotifyService.skipToNext(accessToken).subscribe(() => {
        console.log('Siguiente pista');
      });
    }
  }
}


// import { Component, OnInit } from '@angular/core';
// import { SpotifyService } from '../../services/spotify.service';

// @Component({
//   selector: 'app-plus-psychology',
//   templateUrl: './plus-psychology.component.html',
//   styleUrls: ['./plus-psychology.component.css']
// })
// export class PlusPsychologyComponent implements OnInit {
//   showDetails: any;
//   episodes: any[] = [];

//   private showId = '6wF969GfLUfypoKaicH5gr';
//   private market = 'ES';

//   constructor(
//     private spotifyService: SpotifyService
//   ) { }

//   ngOnInit(): void {
//     this.loadShow();
//     this.loadEpisodes();
//   }

//   // Cargar detalles del show
//   loadShow(): void {
//     this.spotifyService.getShow(this.showId, this.market).subscribe({
//       next: (showData: any) => this.showDetails = showData,
//       error: (err) => console.error('Error al cargar los detalles del show:', err)
//     });
//   }

//   // Cargar episodios del show
//   loadEpisodes(): void {
//     this.spotifyService.getEpisodes(this.showId, this.market).subscribe({
//       next: (episodeData: any) => this.episodes = episodeData.items,
//       error: (err) => console.error('Error al cargar episodios:', err)
//     });
//   }

//   // Reproducir un track
//   play(): void {
//     const deviceId = localStorage.getItem('spotify_device_id');
//     const accessToken = localStorage.getItem('spotify_access_token');

//     if (deviceId && accessToken) {
//       this.spotifyService.setActiveDevice(deviceId).subscribe(() => {
//         const body = {
//           uris: ['spotify:track:3jRUDbIgoYdvPGwWsI7b7Y']
//         };

//         this.spotifyService.play(body).subscribe(
//           () => {
//             console.log('Reproducción iniciada');
//           },
//           (error) => {
//             console.error('Error al iniciar la reproducción:', error);
//           }
//         );
//       });
//     } else {
//       console.error('Faltan device_id o access_token en localStorage');
//     }
//   }

//   // Reproducir episodio
//   playEpisode(episodeUri: string): void {
//     const deviceId = localStorage.getItem('spotify_device_id');
//     const accessToken = localStorage.getItem('spotify_access_token');

//     if (deviceId && accessToken && episodeUri) {
//       const body = {
//         device_id: deviceId,
//         uris: [episodeUri]
//       };

//       this.spotifyService.play(body).subscribe(() => {
//         console.log(`Reproduciendo episodio: ${episodeUri}`);
//       });
//     }
//   }

//   // Pausar la reproducción
//   pause(): void {
//     const accessToken = localStorage.getItem('spotify_access_token');
//     if (accessToken) {
//       this.spotifyService.pause().subscribe(() => {
//         console.log('Reproducción pausada');
//       });
//     }
//   }

//   // Saltar a la siguiente pista
//   skipNext(): void {
//     const accessToken = localStorage.getItem('spotify_access_token');
//     if (accessToken) {
//       this.spotifyService.skipToNext().subscribe(() => {
//         console.log('Siguiente pista');
//       });
//     }
//   }
// }
