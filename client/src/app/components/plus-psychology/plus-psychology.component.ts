import { Component, OnInit } from '@angular/core';
import { SpotifyAuthService } from '../../services/spotify-auth.service';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-plus-psychology',
  templateUrl: './plus-psychology.component.html',
  styleUrls: ['./plus-psychology.component.css']
})
export class PlusPsychologyComponent implements OnInit {
  showDetails: any; // Almacena los detalles del show
  episodes: any[] = [];
  categories: any[] = [];
  playlists: any[] = [];
  private showId = '6wF969GfLUfypoKaicH5gr';
  private market = 'ES';

  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.loadShow(); // Cargar los detalles del show al iniciar
    this.loadEpisodes();
    this.spotifyAuthService.getClientCredentialsToken().subscribe((tokenResponse: any) => {
      const accessToken = tokenResponse.access_token;

       // Inicializar el reproductor de Spotify
    this.spotifyAuthService.initializeSpotifyPlayer(accessToken);

      // Cargar categorías
      this.spotifyAuthService.getCategories(accessToken).subscribe((categoryData: any) => {
        this.categories = categoryData.categories.items;
      });
    });
  }

  loadShow(): void {
    this.spotifyAuthService.getClientCredentialsToken().subscribe((tokenResponse: any) => {
      const accessToken = tokenResponse.access_token;
      this.spotifyService.getShow(accessToken, this.showId, this.market).subscribe((showData: any) => {
        this.showDetails = showData;
        console.log('Detalles del show:', this.showDetails);
      });
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

  // Cargar playlists por categoría seleccionada
  loadPlaylists(categoryId: string): void {
    const token = localStorage.getItem('spotify_access_token');
    if (token) {
      this.spotifyService.getCategoryPlaylists(token, categoryId, this.market).subscribe((playlistData: any) => {
        this.playlists = playlistData.playlists.items;
      });
    }
  }


  // play(): void {
  //   const deviceId = localStorage.getItem('spotify_device_id');
  //   const accessToken = localStorage.getItem('spotify_access_token');

  //   if (deviceId && accessToken) {
  //     const body = {
  //       device_id: deviceId,
  //       uris: ['spotify:track:6qxJcZgS7z2aBSwC4PNxVA']
  //     };

  //     this.spotifyService.play(accessToken, body).subscribe(() => {
  //       console.log('Reproducción iniciada');
  //     });
  //   }
  // }

  play(): void {
    const deviceId = localStorage.getItem('spotify_device_id');
    const accessToken = localStorage.getItem('spotify_access_token');

    // Use the current episode's URI for playback
    const trackUri = this.showDetails?.episodes[0]?.uri; // Adjust to the appropriate episode or track

    if (deviceId && accessToken && trackUri) {
      const body = {
        device_id: deviceId,
        uris: [trackUri]
      };

      this.spotifyService.play(accessToken, body).subscribe(() => {
        console.log('Reproducción iniciada');
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

  initializeSpotifyPlayer(token: string): void {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    (window as any).onSpotifyWebPlaybackSDKReady = () => {
      const player = new (window as any).Spotify.Player({
        name: 'My Web App Player',
        getOAuthToken: (cb: any) => { cb(token); },
        volume: 0.5
      });

      // Configurar eventos del reproductor
      player.addListener('ready', ({ device_id }: any) => {
        console.log('Reproductor listo con Device ID:', device_id);
        localStorage.setItem('spotify_device_id', device_id); // Guardar ID del dispositivo
      });

      player.addListener('not_ready', ({ device_id }: any) => {
        console.log('Reproductor no está listo con Device ID:', device_id);
      });

      player.addListener('initialization_error', ({ message }: any) => {
        console.error('Error de inicialización:', message);
      });

      player.addListener('authentication_error', ({ message }: any) => {
        console.error('Error de autenticación:', message);
      });

      player.addListener('account_error', ({ message }: any) => {
        console.error('Error de cuenta:', message);
      });

      player.connect(); // Conectar el reproductor
    };
  }


}
