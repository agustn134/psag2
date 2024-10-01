import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyectamos el servicio Router para poder redirigir si es necesario
  const token = localStorage.getItem('token'); // Revisamos si hay un token en localStorage

  if (token) {
    // Si hay un token, permitimos el acceso
    return true;
  } else {
    // Si no hay token, redirigimos al login
    router.navigate(['/home/dashboard']);
    return false; // Bloqueamos el acceso
  }
};
