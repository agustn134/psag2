// // import { HttpInterceptorFn } from '@angular/common/http';

// // export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
// //   return next(req);
// // };


// import { HttpInterceptorFn } from '@angular/common/http';
// import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {

//   // Obtener el token del localStorage
//   const token = localStorage.getItem('token');

//   // Si hay un token, clonamos la solicitud para agregar el token al header
//   if (token) {
//     const authReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return next(authReq);
//   }

//   // Si no hay token, la solicitud sigue normal
//   return next(req);
// };

// // Este interceptor agregará automáticamente el
// // token a todas las solicitudes que se hagan desde Angular.


//// Este nos sirve tanto para menejar las peticiones del cliente al servidor, pero tambien podemos manejar los error a los que vuele
///por ejemplo preguntar de que "Che, si me esta devolviendo un error 401, que es lo que tengo que hacer?"

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
    console.log(token); // Verifica el valor del token

    // Si la solicitud es hacia la API de YT, no agregar el token de usuario
    if (req.url.includes('https://www.googleapis.com/youtube/v3')) {
      return next.handle(req); // No agregar el token, solo pasar la solicitud
    }

    // Si la solicitud es hacia la API de YT, no agregar el token de usuario
    if (req.url.includes('https://accounts.spotify.com/authorize')) {
      return next.handle(req); // No agregar el token, solo pasar la solicitud
    }


    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Manejar el error 401 (No autorizado)
          console.error('Error 401: Usuario no autorizado');
          // Redirigir al login
          this.router.navigate(['/login']);
        }

        // Reenviar cualquier otro error
        return throwError(error);
      })
    );
  }
}
