import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';  // Importar el servicio de Toastr

@Component({
  selector: 'app-add-profiles',
  templateUrl: './add-profiles.component.html',
  styleUrl: './add-profiles.component.css',
})
export class AddProfilesComponent implements OnInit {


  // deleteUser(id_usuario: string): void  {
  //   this.userService.deleteUser(id_usuario).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.getUsers(); // Update the user list after deletion
  //     },
  //     err => console.log(err)

  //   );
  // }

  // deleteUser(id_usuario: string): void {
  //   this.userService.deleteUser(id_usuario).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.toastr.error('Usuario eliminado con éxito.', 'Usuario Eliminado');  // Mostrar Toastr
  //       this.getUsers(); // Actualizar la lista de usuarios
  //     },
  //     (err) => {
  //       console.error(err);
  //       this.toastr.error('Error al eliminar el usuario.', 'Error');
  //     }
  //   );
  // }

  deleteUser(id_usuario: string): void {
    this.userService.deleteUser(id_usuario).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Usuario eliminado con éxito.', 'Usuario Eliminado');

        // Remover el usuario eliminado de la lista local
        this.users = this.users.filter(user => user.id_usuario !== id_usuario);
        this.filteredUsers = this.filteredUsers.filter(user => user.id_usuario !== id_usuario);
      },
      (err) => {
        console.error(err);
        this.toastr.error('Error al eliminar el usuario.', 'Error');
      }
    );
  }





  users: User[] = [];

  filteredUsers: User[] = [];

  // Variables para almacenar datos
  nombre: string = '';
  ape_paterno: string = '';
  ape_materno: string = '';
  e_mail: string = '';
  password: string = '';
  telefono: string = '';
  id_carrera: string = '';
  grupo: string = '';
  id_rol: string = '';
  imagen_url: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
      this.filteredUsers = data; // Inicialmente la lista filtrada es igual a la lista completa
    });
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

  filterUsers(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();

    // Filtramos los usuarios basado en el nombre, apellido o email
    this.filteredUsers = this.users.filter(
      (user) =>
        user.nombre.toLowerCase().includes(searchTerm) ||
        user.ape_paterno.toLowerCase().includes(searchTerm) ||
        user.ape_materno.toLowerCase().includes(searchTerm) ||
        user.e_mail.toLowerCase().includes(searchTerm)
    );
  }

  adduserbyAdmin(): void {
    const newUser: User = {
      nombre: this.nombre,
      ape_paterno: this.ape_paterno,
      ape_materno: this.ape_materno,
      e_mail: this.e_mail,
      password: this.password,
      telefono: this.telefono,
      id_carrera: this.id_carrera,
      grupo: this.grupo,
      id_rol: this.id_rol,
      imagen_url: this.imagen_url,
      // No incluyes id_usuario, será generado por el backend
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
