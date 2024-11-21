/* import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../utils/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { SpotifyAuthService } from '../../services/spotify-auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isMenuOpen: boolean = false;
  isMenuOpenProfile: boolean = false;
  isLoggedIn: boolean = false;
  errorMessage: string = '';
  isLoggedInIdAdmin: boolean = false;

  user: User = {
    nombre: '',
    ape_paterno: '',
    ape_materno: '',
    e_mail: '',
    telefono: '',
    grupo: '',
    imagen_url: '',
    password: '',
    id_carrera: '',
    id_rol: '',
  };

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private spotifyAuthService: SpotifyAuthService) {}

  ngOnInit() {
    this.authService.currentStatus.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.userService.getUserProfile().subscribe(
          (user) => {
            this.user = user;  // Asigna los datos del usuario al objeto 'user'
          },
          (error) => {
            console.error('Error al obtener el perfil del usuario:', error);
          }
        );
      }
    });

    this.authService.currentStatusId.subscribe((status) => {
      this.isLoggedInIdAdmin = status;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMenuProfile() {
    this.isMenuOpenProfile = !this.isMenuOpenProfile;
  }

  logOut() {
    this.authService.logOut();
    window.location.href = '/home';
  }

  selectMenuItem() {
    this.isMenuOpen = false;
  }

  login() {
    this.spotifyAuthService.login(); // Inicia el proceso de autenticación
  }

}
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../utils/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { SpotifyAuthService } from '../../services/spotify-auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isMenuOpen: boolean = false;
  isMenuOpenProfile: boolean = false;
  isLoggedIn: boolean = false;
  errorMessage: string = '';
  isLoggedInIdAdmin: boolean = false;
  idRol: number | null = null;

  user: User = {
    nombre: '',
    ape_paterno: '',
    ape_materno: '',
    e_mail: '',
    telefono: '',
    grupo: '',
    imagen_url: '',
    password: '',
    id_carrera: '',
    id_rol: '',
  };

  userRole: number | null = null; // Nueva propiedad para almacenar el rol del usuario

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private spotifyAuthService: SpotifyAuthService
  ) {}

  ngOnInit() {
    const userDetails = this.userService.getUserDetailsFromToken();
    
    // Verifica si el usuario está logueado
    this.authService.currentStatus.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.userService.getUserProfile().subscribe(
          (user) => {
            this.user = user; // Asigna los datos del usuario al objeto 'user'
            // Asegura que el id_rol se parsea correctamente, con un valor por defecto de 0
            this.userRole = parseInt(user.id_rol || '1', 10); // Si id_rol es undefined, se asigna ''
          },
          (error) => {
            console.error('Error al obtener el perfil del usuario:', error);
          }
        );
      }
    });
  
    this.authService.currentStatusId.subscribe((status) => {
      this.isLoggedInIdAdmin = status;
    });
  }
  

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMenuProfile() {
    this.isMenuOpenProfile = !this.isMenuOpenProfile;
  }

  logOut() {
    this.authService.logOut();
    window.location.href = '/home';
  }

  selectMenuItem() {
    this.isMenuOpen = false;
  }

  login() {
    this.spotifyAuthService.login(); // Inicia el proceso de autenticación
  }
}
