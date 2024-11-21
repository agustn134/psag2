// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable()
// export class AddTokenInterceptor implements HttpInterceptor {

//   constructor(private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');
//     console.log(token); // Verifica el valor del token

//     // Si la solicitud es hacia la API de YT, no agregar el token de usuario
//     if (req.url.includes('https://www.googleapis.com/youtube/v3')) {
//       return next.handle(req); // No agregar el token, solo pasar la solicitud
//     }

//     // Si la solicitud es hacia la API de YT, no agregar el token de usuario
//     if (req.url.includes('https://accounts.spotify.com/authorize')) {
//       return next.handle(req); // No agregar el token, solo pasar la solicitud
//     }

//     // Si la solicitud es hacia la API de Dayli, no agregar el token de usuario
//     if (req.url.includes('https://api.daily.co/v1//meeting-tokens')) {
//       return next.handle(req); // No agregar el token, solo pasar la solicitud
//     }


//     let authReq = req;
//     if (token) {
//       authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }

//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           // Manejar el error 401 (No autorizado)
//           console.error('Error 401: Usuario no autorizado');
//           // Redirigir al login
//           this.router.navigate(['/login']);
//         }

//         // Reenviar cualquier otro error
//         return throwError(error);
//       })
//     );
//   }
// }




import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log(`Interceptando solicitud hacia: ${req.url}`);
    const excludedUrls = [
      'https://www.googleapis.com/youtube/v3',
      'https://accounts.spotify.com/authorize',
      'https://api.daily.co/v1//meeting-tokens'
      // 'https://4200videocall.daily.co/room-conf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyIjoicm9vbS1jb25mIiwibyI6dHJ1ZSwidm8iOmZhbHNlLCJhbyI6ZmFsc2UsImQiOiJmZGZiZDA2MS1hMDk3LTQzYWItODYzYy1mMWU4OTYyMDc4NGIiLCJpYXQiOjE3MzIwNDg5NDR9.oXcW1-awCb0cIjFA3dGSRHkH0GzeJ5ADiAkn4ywOBwU'
    ];

    // Si la URL está en las excluidas, no agregar token
    // if (excludedUrls.some(url => req.url.includes(url))) {
    //   console.log('URL excluida, enviando solicitud sin token.');
    //   return next.handle(req);
    // }
    if (excludedUrls.some(url => req.url.includes(url))) {
      console.log('URL excluida, enviando solicitud sin token:', req.url);
      return next.handle(req);
    }

    // Agregar el token a la solicitud si existe
    let authReq = req;
    if (token) {
      console.log('Token encontrado y agregado.');
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      console.warn('No se encontró un token en localStorage.');
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Error 401: Usuario no autorizado. Redirigiendo al login.');
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
