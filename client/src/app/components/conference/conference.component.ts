import { Component, OnInit } from '@angular/core';
import DailyIframe from '@daily-co/daily-js';
import { DailyService } from '../../services/daily-service.service';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css'],
})
export class ConferenceComponent implements OnInit {
  callFrame: any;
  // createCallFrame: any;

  constructor(private dailyService: DailyService) {}

  ngOnInit(): void {
    this.initializeCall();
  }

  initializeCall(): void {
    // Obtener el token para el espectador
    this.dailyService.getMeetingToken('room-conf', false).subscribe({
      // next: (response) => {
      //   const token = response.token;
      //   const roomUrl = `https://4200videocall.daily.co/room-conf?token=${token}`;

      //   this.callFrame = DailyIframe.createFrame({
      //     iframeStyle: {
      //       position: 'relative',
      //       width: '100%',
      //       height: '500px',
      //     },
      //   });

      //   this.callFrame
      //     .join({ url: roomUrl })
      //     .then(() => {
      //       console.log('Unido como Espectador');
      //     })
      //     .catch((error: any) => {
      //       console.error('Error al unirse a la llamada:', error);
      //     });
      // },
      // error: (err) => {
      //   console.error('Error al obtener el token:', err);
      // },

      next: (response) => {
        if (response && response.token) {
          const token = response.token;
          const roomUrl = `https://4200videocall.daily.co/room-conf?token=${token}`;
          this.createCallFrame(roomUrl);
          console.log(`Token en interceptor: ${token}`);

        } else {
          console.error('No se recibió un token válido.');
        }
      },
      error: (err) => {
        console.error('Error al obtener el token:', err);
      },
    });
  }

  createCallFrame(roomUrl: string): void {
    this.callFrame = DailyIframe.createFrame({
      iframeStyle: {
        position: 'relative',
        width: '100%',
        height: '500px',
      },
    });

    this.callFrame
      .join({ url: roomUrl })
      .then(() => console.log('Unido como Espectador'))
      .catch((error: any) => console.error('Error al unirse a la llamada:', error));

  }



  leaveCall(): void {
    if (this.callFrame) {
      this.callFrame.leave();
    }
  }
}
