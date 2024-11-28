/* import { Component, OnInit } from '@angular/core';
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
 */





































































// import { Component, OnInit, OnDestroy } from '@angular/core';
// import DailyIframe from '@daily-co/daily-js';

// @Component({
//   selector: 'app-conference',
//   templateUrl: './conference.component.html',
//   styleUrls: ['./conference.component.css'],
// })
// export class ConferenceComponent implements OnInit, OnDestroy {
//   callFrame: any | null = null;

//   // URL de la sala en Daily.co
//   roomUrl: string = 'https://4200videocall.daily.co/room-conf';

//   constructor() {}

//   ngOnInit(): void {
//     this.initializeCall();
//   }

//   initializeCall(): void {
//     const callContainer = document.getElementById('call-container');
//     if (!callContainer) {
//       console.error('No se encontró el contenedor de la llamada.');
//       return;
//     }

//     try {
//       // Crear el frame de la llamada dentro del contenedor
//       this.callFrame = DailyIframe.createFrame(callContainer, {
//         iframeStyle: {
//           width: '100%',
//           height: '100%',
//           border: '0',
//         },
//       });

//       // Unirse a la sala
//       this.callFrame
//         .join({ url: this.roomUrl })
//         .then(() => console.log('Unido a la llamada'))
//         .catch((error: any) =>
//           console.error('Error al unirse a la llamada:', error)
//         );
//     } catch (error) {
//       console.error('Error al inicializar la llamada:', error);
//     }
//   }

//   leaveCall(): void {
//     if (!this.callFrame) {
//       console.warn('No hay una llamada activa para salir.');
//       return;
//     }

//     this.callFrame
//       .leave()
//       .then(() => {
//         console.log('Saliste de la llamada');
//         this.callFrame.destroy();
//         this.callFrame = null; // Limpieza
//       })
//       .catch((error: any) =>
//         console.error('Error al salir de la llamada:', error)
//       );
//   }

//   ngOnDestroy(): void {
//     if (this.callFrame) {
//       this.callFrame.leave().finally(() => {
//         this.callFrame.destroy();
//         this.callFrame = null;
//       });
//     }
//   }
// }



































import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router'; // Importar el servicio Router
import DailyIframe from '@daily-co/daily-js';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css'],
})
export class ConferenceComponent implements OnInit, OnDestroy {
  callFrame: any | null = null;
  roomUrl: string = 'https://4200videocall.daily.co/room-conf';

  constructor(private router: Router) {} // Inyectar el servicio Router

  ngOnInit(): void {
    this.initializeCall();
  }

  initializeCall(): void {
    const callContainer = document.getElementById('call-container');
    if (!callContainer) {
      console.error('No se encontró el contenedor de la llamada.');
      return;
    }

    try {
      this.callFrame = DailyIframe.createFrame(callContainer, {
        iframeStyle: {
          width: '100%',
          height: '100%',
          border: '0',
        },
      });

      this.callFrame
        .join({ url: this.roomUrl })
        .then(() => console.log('Unido a la llamada'))
        .catch((error: any) =>
          console.error('Error al unirse a la llamada:', error)
        );
    } catch (error) {
      console.error('Error al inicializar la llamada:', error);
    }
  }

  leaveCall(): void {
    if (!this.callFrame) {
      console.warn('No hay una llamada activa para salir.');
      this.redirectToDashboard(); // Redirigir incluso si no hay llamada activa
      return;
    }

    this.callFrame
      .leave()
      .then(() => {
        console.log('Saliste de la llamada');
        this.callFrame.destroy();
        this.callFrame = null; // Limpieza
        this.redirectToDashboard(); // Redirigir después de salir
      })
      .catch((error: any) => {
        console.error('Error al salir de la llamada:', error);
        this.redirectToDashboard(); // Intentar redirigir incluso si hay un error
      });
  }

  redirectToDashboard(): void {
    this.router.navigate(['home/dashboard']); // Redirigir al componente Dashboard
  }

  ngOnDestroy(): void {
    if (this.callFrame) {
      this.callFrame.leave().finally(() => {
        this.callFrame.destroy();
        this.callFrame = null;
      });
    }
  }
}
