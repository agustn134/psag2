import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-profiles',
  templateUrl: './add-profiles.component.html',
  styleUrl: './add-profiles.component.css',
})
export class AddProfilesComponent {

  users: any = [];

  // Variables para almacenar datos
  nombre: string= '';
  ape_paterno: string= '';
  ape_materno: string= '';
  e_mail: string= '';
  password: string= '';
  telefono: string= '';
  id_carrera: string= '';
  grupo: string= '';
  id_rol: string= '';
  imagen_url: string= '';


  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(
      (res) => {
        this.users = res;
        console.log(this.users);
      },
      (err) => console.log(err)
    );
  }

  adduserbyAdmin(): void {
    const newUser = {
      nombre: this.nombre,
      ape_paterno: this.ape_paterno,
      ape_materno: this.ape_materno,
      e_mail: this.e_mail,
      password: this.password,
      telefono: this.telefono,
      id_carrera: this.id_carrera,
      grupo: this.grupo,
      id_rol: this.id_rol,
      imagen_url: this.imagen_url
    };

    this.userService.createUserByAdmin(newUser).subscribe(
      (res) => {
        console.log('Usuario registrado exitosamente', res);
        this.getUsers(); // Actualizar la lista de usuarios
      },
      (err) => console.error('Error al registrar el usuario', err)
    );
  }


}
