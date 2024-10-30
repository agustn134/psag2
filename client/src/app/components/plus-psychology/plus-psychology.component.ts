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
  private showId = '1TDJJoHWEq7Nbh3yEBOJOj';
  private market = 'ES';

  constructor(
    private spotifyAuthService: SpotifyAuthService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.loadShow(); // Cargar los detalles del show al iniciar
  }

  loadShow(): void {
    this.spotifyAuthService.getClientCredentialsToken().subscribe((tokenResponse: any) => {
      const accessToken = tokenResponse.access_token;
      this.spotifyService.getShow(accessToken, this.showId, this.market).subscribe((showData: any) => {
        this.showDetails = showData; // Almacena los detalles del show
        console.log('Detalles del show:', this.showDetails);
      });
    });
  }
}
