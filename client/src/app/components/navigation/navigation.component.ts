import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../utils/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

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

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.authService.currentStatus.subscribe((status) => {
      this.isLoggedIn = status;
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
    // this.router.navigate(['/login']);
    window.location.href = '/home';
  }

  selectMenuItem() {
    this.isMenuOpen = false;
  }

  // Añade este método para verificar si el usuario es admin
  // showAdminMenu(): boolean {
  //   return this.isLoggedInIdAdmin; // Aquí se puede ajustar la lógica si es necesario
  // }

}
