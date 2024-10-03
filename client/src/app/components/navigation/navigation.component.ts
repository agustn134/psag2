// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../utils/auth.service';
// import { UserService } from '../../services/user.service';
// import { User } from '../../models/user';

// @Component({
//   selector: 'app-navigation',
//   templateUrl: './navigation.component.html',
//   styleUrls: ['./navigation.component.css'],
// })
// export class NavigationComponent implements OnInit {
//   isMenuOpen: boolean = false;
//   isMenuOpenProfile: boolean = false;
//   isLoggedIn: boolean = false;
//   errorMessage: string = ''; // Para almacenar mensajes de error
//   user: User = {
//     nombre: '', // Nombre del usuario
//     ape_paterno: '', // Apellido paterno
//     ape_materno: '', // Apellido materno
//     e_mail: '', // Correo electrónico
//     telefono: '', // Teléfono
//     grupo: '', // Grupo al que pertenece el usuario
//     imagen_url: '',
//     password: '',
//     id_carrera: '',
//     id_rol: '',
//   };

//   constructor(
//     private router: Router,
//     private authService: AuthService,
//     private userService: UserService
//   ) {}

//   ngOnInit() {
//     this.authService.currentStatus.subscribe((status) => {
//       this.isLoggedIn = status; // Actualiza el estado de inicio de sesión
//     });
//     this.getUserById(); // Llamar al método para obtener el usuario al cargar el componente
//   }

//   toggleMenu() {
//     this.isMenuOpen = !this.isMenuOpen;
//   }

//   toggleMenuProfile() {
//     this.isMenuOpenProfile = !this.isMenuOpenProfile;
//   }

//   logOut() {
//     this.authService.logOut(); // Utiliza el servicio para cerrar sesión
//     this.router.navigate(['/login']);
//   }

//   selectMenuItem() {
//     this.isMenuOpen = false; // Oculta el menú móvil al seleccionar un elemento
//   }

//   getUserById(): void {
//     const userId = this.userService.getUserIdFromToken(); // Obtiene el ID del usuario desde el token
//     if (userId) {
//       this.userService.getUserById(userId).subscribe(
//         (data: User) => {
//           this.user = data; // Asegúrate de que `data` contenga `imagen_url`
//           console.log('Rol del usuario:', this.user.id_rol); // Aquí puedes acceder al id_rol
//         },
//         (error) => {
//           console.error('Error al obtener los datos del usuario:', error);
//           this.errorMessage = 'No se pudieron obtener los datos del usuario.';
//         }
//       );
//     } else {
//       console.error('No se encontró el ID del usuario en el token.');
//       this.errorMessage = 'No se encontró el ID del usuario en el token.';
//     }
//   }

//   getUserIdRol():{
//     const IdRol = this.userService.getUserIdRolFromToken(); // Obtiene el ID del usuario desde el token
//   }


// }




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



    // this.getUserById(); // Llamar al método para obtener el usuario al cargar el componente


  // getUserById(): void {
  //   const userId = this.userService.getUserIdFromToken(); // Obtiene el ID del usuario desde el token
  //   if (userId) {
  //     this.userService.getUserById(userId).subscribe(
  //       (data: User) => {
  //         this.user = data;
  //       },
  //       (error) => {
  //         console.error('Error al obtener los datos del usuario:', error);
  //         this.errorMessage = 'No se pudieron obtener los datos del usuario.';
  //       }
  //     );
  //   } else {
  //     console.error('No se encontró el ID del usuario en el token.');
  //     this.errorMessage = 'No se encontró el ID del usuario en el token.';
  //   }
  // }


  // getUserIdRol(): void {
  //   const userRole = this.userService.getUserIdRolFromToken(); // Obtiene el rol del usuario desde el token
  // }









  // // Método para obtener el rol de usuario desde el token
  // getUserIdRol(): void {
  //   const userRole = this.userService.getUserIdRolFromToken(); // Obtiene el rol del usuario desde el token
  //   if (userRole) {
  //     this.userRole = userRole; // Almacena el rol en la variable de la clase
  //     let roleName = '';

  //     // Condiciones basadas en el valor del rol
  //     if (userRole === '1') {
  //       roleName = 'Alumno';
  //     } else if (userRole === '2') {
  //       roleName = 'Psicologo';
  //     } else if (userRole === '3') {
  //       roleName = 'Admin';
  //     } else {
  //       roleName = 'Rol desconocido';
  //     }

  //     console.log('Rol del usuario:', roleName); // Muestra el nombre del rol en la consola
  //   } else {
  //     console.error('No se encontró el rol del usuario en el token.');
  //   }
  // }


  // Método para obtener el rol de usuario desde el token
