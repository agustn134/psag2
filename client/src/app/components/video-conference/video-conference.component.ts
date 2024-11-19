import { Component, OnInit, OnDestroy } from '@angular/core';
import DailyIframe, { DailyCall } from '@daily-co/daily-js';

@Component({
  selector: 'app-video-conference',
  templateUrl: './video-conference.component.html',
  styleUrls: ['./video-conference.component.css'],
})
export class VideoConferenceComponent implements OnInit, OnDestroy {
  private callFrame!: DailyCall;

  ngOnInit() {
    // Inicializa el iframe para la videollamada
    this.callFrame = DailyIframe.createFrame({
      iframeStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: '0',
      },
    });

    // Únete a una sala de Daily
    this.callFrame.join({
      url: 'https://tu-dominio.daily.co/tu-sala',
      token: 'TOKEN_GENERADO',
      userName: 'Usuario Espectador', // Nombre del usuario
    });

    // Escucha eventos importantes
    this.callFrame.on('participant-joined', (event) => {
      console.log('Participante unido:', event.participant);
    });

    this.callFrame.on('participant-left', (event) => {
      console.log('Participante salió:', event.participant);
    });
  }

  ngOnDestroy() {
    // Limpia la llamada cuando el componente se destruye
    if (this.callFrame) {
      this.callFrame.leave();
    }
  }
}
