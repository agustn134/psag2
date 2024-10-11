import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Asegúrate de importar estos
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-profiles',
  templateUrl: './add-profiles.component.html',
  styleUrl: './add-profiles.component.css'
})
export class AddProfilesComponent {

  registerForm: FormGroup; // Define el FormGroup
  message: string = '';
  success: boolean = true;
  loading: boolean = false;
  users: any = [];

  constructor(
    private fb: FormBuilder, // Inyecta FormBuilder
    private router: Router,
    private userService: UserService
  ) {
    // Inicializa el FormGroup
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      ape_paterno: ['', Validators.required],
      ape_materno: ['', Validators.required],
      e_mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', Validators.required],
      grupo: ['', Validators.required],
      id_carrera: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }


  getUsers(): void {
    this.userService.getUsers().subscribe(
      res => {
        this.users = res;
        console.log(this.users);
      },
      err => console.log(err)
    );
  }


  addUser() {
    throw new Error('Method not implemented.');
    }



    createUser() {
      if (this.registerForm.invalid) {
        this.message = 'Por favor, completa todos los campos correctamente.';
        this.success = false;
        return;
      }

      const user: User = this.registerForm.value; // Obtener los valores del formulario

      this.loading = true;
      this.userService.createUser(user).subscribe({
        next: (data) => {
          this.loading = false;
          console.log(data);
          this.message = 'Usuario registrado con éxit.';
          this.success = true;
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al registrar el usuario:', error);
          this.message = 'Hubo un error al registrar el usuario. Inténtalo de nuevo.';
          this.success = false;
        }
      });
    }

}
