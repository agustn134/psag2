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

  adduserbyAdmin() {
    throw new Error('Method not implemented.');
  }

}
