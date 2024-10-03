import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkLoginStatus());
  currentStatus = this.loggedIn.asObservable();

  constructor() {}

  checkLoginStatus(): boolean {
    // Verifica si el token existe en localStorage
    return !!localStorage.getItem('token');
  }

  logIn(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  logOut() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }


}









