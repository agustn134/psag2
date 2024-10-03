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
    this.authService.currentStatus.subscribe((status) => {this.isLoggedIn = status; });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleMenuProfile() {
    this.isMenuOpenProfile = !this.isMenuOpenProfile;
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  logOutId() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }

  selectMenuItem() {
    this.isMenuOpen = false;
  }

}
