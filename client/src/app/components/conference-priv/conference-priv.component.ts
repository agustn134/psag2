import { Component } from '@angular/core';
import DailyIframe from '@daily-co/daily-js';
import { DailyService } from '../../services/daily-service.service';

@Component({
  selector: 'app-conference-priv',
  templateUrl: './conference-priv.component.html',
  styleUrls: ['./conference-priv.component.css'],
})
export class ConferencePrivComponent {
  callFrame: any;

  constructor(private dailyService: DailyService) {}

  ngOnInit(): void {
    this.initializeCall();
  }

  initializeCall(): void {
    // Obtener el token para el presentador
    this.dailyService.getMeetingToken('room-conf', true).subscribe({
      next: (response) => {
        const token = response.token;
        const roomUrl = `https://4200videocall.daily.co/room-conf?token=${token}`;

        this.callFrame = DailyIframe.createFrame({
          iframeStyle: {
            position: 'relative',
            width: '100%',
            height: '500px',
          },
        });

        this.callFrame
          .join({ url: roomUrl })
          .then(() => {
            console.log('Unido como Presentador');
          })
          .catch((error: any) => {
            console.error('Error al unirse a la llamada:', error);
          });
      },
      error: (err) => {
        console.error('Error al obtener el token:', err);
      },
    });
  }

  leaveCall(): void {
    if (this.callFrame) {
      this.callFrame.leave();
    }
  }
}
