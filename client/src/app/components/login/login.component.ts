import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Userlog } from '../../models/userlog';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { decode } from 'jwt-js-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']   // Corregido a styleUrls
})
export class LoginComponent implements OnInit {

  // Variables para almacenar el email y la contraseña
  e_mail: string = '';
  password: string = '';

  constructor(
    private toastr: ToastrService,     // Servicio de notificaciones
    private userService: UserService,  // Servicio para manejo de usuarios
    private router: Router             // Servicio de enrutamiento
  ) { }

  ngOnInit(): void {
    // Se ejecuta al inicializar el componente
  }

  // loginUser() {
  //   // Validación: Verificar que los campos no estén vacíos
  //   if (this.e_mail === '' || this.password === '') {
  //     this.toastr.error('Debes ingresar un email y una contraseña');
  //     return;  // Evitar que se siga ejecutando el código si hay error
  //   }

  //   // Crear objeto con los datos ingresados por el usuario
  //   const userlog: Userlog = {
  //     e_mail: this.e_mail,       // Correo electrónico
  //     password: this.password    // Contraseña
  //   };

  //   console.log(userlog);  // Imprimir datos para verificar el objeto

  //   // Llamar al servicio de login y manejar la respuesta
  //   this.userService.loginUser(userlog).subscribe({
  //     next: (response: any) => {
  //       // Si el login es exitoso, guardar el token y redirigir
  //       const token = response.token;  // Asegúrate que la respuesta tenga el token en esta propiedad
  //       localStorage.setItem('token', token);  // Guardar token en el localStorage
  //       console.log('Token guardado:', token);


  //       // Redireccionar a la página principal u otra
  //       this.router.navigate(['/home/dashboard']);  // Cambia '/' por la ruta a la que quieres redirigir
  //     },
  //     error: (e: HttpErrorResponse) => {
  //       // Manejar errores en el login
  //       this.msjError(e);  // Mostrar mensaje de error personalizado
  //     }
  //   });
  // }


  loginUser() {
    // Validación: Verificar que los campos no estén vacíos
    if (this.e_mail === '' || this.password === '') {
      this.toastr.error('Debes ingresar un email y una contraseña');
      return;  // Evitar que se siga ejecutando el código si hay error
    }

    // Crear objeto con los datos ingresados por el usuario
    const userlog: Userlog = {
      e_mail: this.e_mail,       // Correo electrónico
      password: this.password    // Contraseña
    };

    console.log(userlog);  // Imprimir datos para verificar el objeto

    // Llamar al servicio de login y manejar la respuesta
    this.userService.loginUser(userlog).subscribe({
      next: (response: any) => {
        // Si el login es exitoso, guardar el token y redirigir
        const token = response.token;  // Asegúrate que la respuesta tenga el token en esta propiedad
        localStorage.setItem('token', token);  // Guardar token en el localStorage
        console.log('Token guardado:', token);

        // Decodificar el token
        let jwt = decode(token);  // Cambiado para usar el token real
        console.log('Token decodificado:', jwt);  // Mostrar el token decodificado

        // Redireccionar a la página principal u otra
        this.router.navigate(['/home/dashboard']);  // Cambia '/' por la ruta a la que quieres redirigir
      },
      error: (e: HttpErrorResponse) => {
        // Manejar errores en el login
        this.msjError(e);  // Mostrar mensaje de error personalizado
      }
    });
  }


  // Método para mostrar los mensajes de error
  msjError(e: HttpErrorResponse) {
    // Si el error tiene un mensaje personalizado, mostrarlo
    if (e.error.msg) {
      this.toastr.error(e.error.msg, "Error");
    } else {
      // Mensaje genérico si no se proporciona uno específico
      this.toastr.error("Error al iniciar sesión", "Error");
    }
  }

}
