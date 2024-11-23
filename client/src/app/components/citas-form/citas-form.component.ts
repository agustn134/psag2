import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CitaService } from '../../services/cita.service';
import { Router } from '@angular/router';
import { ConsultorioService } from '../../services/consultorio.service';
import { HorarioService } from '../../services/horario.service';
// import { decode } from 'jwt-js-decode'; // Importa para decodificar el token JWT

@Component({
  selector: 'app-citas-form',
  templateUrl: './citas-form.component.html',
  styleUrls: ['./citas-form.component.css'],
})
export class CitasFormComponent implements OnInit {
  citaForm: FormGroup;
  showToast: boolean = false; // Controla la visibilidad del toast
  toastMessage: string = ''; // Mensaje del toast
  toastType: 'success' | 'error' = 'success'; // Tipo del toast
  psicologos: any[] = []; // Lista de psicólogos
  consultorios: any[] = []; // Lista de consultorios
  horarios: any[] = []; // Lista de horarios

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private consultorioService: ConsultorioService,
    private horarioservice: HorarioService,
    private citaService: CitaService,
    private router: Router
  ) {
    this.citaForm = this.fb.group({
      id_psicologo: ['', Validators.required],
      id_alumno: [{ value: '', disabled: true }, Validators.required], // Campo prellenado y deshabilitado
      id_consultorio: ['', Validators.required],
      id_horario: ['', Validators.required],
      motivo: ['', [Validators.required, Validators.maxLength(200)]],
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Establece el ID del usuario automáticamente
    const userId = this.userService.getUserIdFromToken();
    if (userId) {
      this.citaForm.patchValue({ id_alumno: userId });
    } else {
      console.error('No se pudo obtener el ID del usuario desde el token. Verifica que el usuario esté autenticado.');
    }

    // Obtener la lista de psicólogos desde el backend
    this.userService.getPsychologists().subscribe(
      (data) => {
        this.psicologos = data; // Asignar los psicólogos obtenidos a la variable
      },
      (error) => {
        console.error('Error al obtener psicólogos:', error);
      }
    );

    // Obtener la lista de consultorios desde el backend
    this.consultorioService.getConsultorios().subscribe((data) => {
      this.consultorios = data; // Asignar los psicólogos obtenidos a la variable
    });

    // Obtener la lista de consultorios desde el backend
    this.horarioservice.getHorarios().subscribe((data) => {
      this.horarios = data; // Asignar los psicólogos obtenidos a la variable
    });

  }

  // Método para guardar la cita
  saveCita(): void {
    if (this.citaForm.valid) {
      const citaData = { ...this.citaForm.value, id_alumno: this.citaForm.get('id_alumno')?.value }; // Incluye el campo deshabilitado
      this.citaService.saveCita(citaData).subscribe(
        (res) => {
          this.showNotification('¡Cita agendada exitosamente!', 'success');
          this.router.navigate(['/citas']);
        },
        (err) => {
          this.showNotification('Hubo un error al agendar la cita.', 'error');
          console.error('Error al crear la cita:', err);
        }
      );
    } else {
      this.showNotification('Por favor, completa todos los campos requeridos.', 'error');
    }
  }

  // Método para mostrar el toast
  showNotification(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    // Ocultar el toast automáticamente después de 3 segundos
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }


/**
   * Obtiene el ID del usuario decodificando el token JWT almacenado en el localStorage.
   * @returns El ID del usuario si se encuentra el token, o null si no existe.
   */
// getUserIdFromToken(): number | null {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     console.log('Token no encontrado');
//     return null;
//   }
//   try {
//     const decodedToken = decode(token);
//     const userId = decodedToken.payload['id'];
//     return userId;
//   } catch (error) {
//     console.error('Error al decodificar el token:', error);
//     return null;
//   }
// }


/**
 * Obtiene el ID del usuario decodificando el token JWT almacenado en localStorage.
 * @returns El ID del usuario si se encuentra el token, o null si no existe.
 */
getUserIdFromToken(): number | null {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('Token no encontrado');
    return null;
  }
  const decodedToken = this.userService['decodeJWT'](token);
  if (!decodedToken) {
    console.error('No se pudo decodificar el token.');
    return null;
  }
  const userId = decodedToken['id'];
  return userId;
}


}



// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CitaService } from '../../services/cita.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-citas-form',
//   templateUrl: './citas-form.component.html',
//   styleUrls: ['./citas-form.component.css'], // Cambia a 'styleUrls' con 's'
// })
// export class CitasFormComponent {
//   citaForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private citaService: CitaService,
//     private router: Router
//   ) {
//     // Inicializar el formulario
//     this.citaForm = this.fb.group({
//       id_psicologo: ['', Validators.required],
//       id_alumno: ['', Validators.required],
//       id_consultorio: ['', Validators.required],
//       id_horario: ['', Validators.required],
//       motivo: ['', [Validators.required, Validators.maxLength(200)]],
//       correo: ['', [Validators.required, Validators.email]],
//     });
//   }

//   // Método para guardar la cita
//   saveCita() {
//     if (this.citaForm.valid) {
//       this.citaService.saveCita(this.citaForm.value).subscribe(
//         (response) => {
//           console.log('Cita creada:', response);
//           alert('Cita creada exitosamente.');
//           this.router.navigate(['/citas']); // Redirige a una lista de citas o donde prefieras
//         },
//         (error) => {
//           console.error('Error al crear la cita:', error);
//           alert('Error al crear la cita.');
//         }
//       );
//     } else {
//       alert('Por favor, completa todos los campos requeridos.');
//     }
//   }
// }













































// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../../services/user.service';
// import { CitaService } from '../../services/cita.service';
// import { Router } from '@angular/router';


// @Component({
//   selector: 'app-citas-form',
//   templateUrl: './citas-form.component.html',
//   styleUrls: ['./citas-form.component.css'],
// })
// export class CitasFormComponent {
//   citaForm: FormGroup;
//   showToast: boolean = false; // Controla la visibilidad del toast
//   toastMessage: string = ''; // Mensaje del toast
//   toastType: 'success' | 'error' = 'success'; // Tipo del toast

//   constructor(
//     private fb: FormBuilder, private userService: UserService,
//     private citaService: CitaService,
//     private router: Router
//   ) {
//     this.citaForm = this.fb.group({
//       id_psicologo: ['', Validators.required],
//       // id_alumno: ['', Validators.required],
//       id_alumno: [{ value: '', disabled: true }, Validators.required], // Campo prellenado y deshabilitado
//       id_consultorio: ['', Validators.required],
//       id_horario: ['', Validators.required],
//       motivo: ['', [Validators.required, Validators.maxLength(200)]],
//       correo: ['', [Validators.required, Validators.email]],
//     });

//     // Obtén el ID del usuario desde el token
//     const userId = this.userService.getUserIdFromToken();
//     if (userId) {
//       this.citaForm.patchValue({ id_alumno: userId }); // Establece el ID en el formulario
//     } else {
//       console.error('No se pudo obtener el ID del usuario desde el token.');
//     }

//   }

//   // Método para guardar la cita
//   saveCita() {
//     if (this.citaForm.valid) {
//       this.citaService.saveCita(this.citaForm.value).subscribe(
//         (res) => {
//           this.showNotification('¡Cita agendada exitosamente!', 'success');
//           this.router.navigate(['/citas']);
//         },
//         (err) => {
//           this.showNotification('Hubo un error al agendar la cita.', 'error');
//           console.error('Error al crear la cita:', err);
//         }
//       );
//     } else {
//       this.showNotification('Por favor, completa todos los campos requeridos.', 'error');
//     }
//   }

//   // Método para mostrar el toast
//   showNotification(message: string, type: 'success' | 'error') {
//     this.toastMessage = message;
//     this.toastType = type;
//     this.showToast = true;

//     // Ocultar el toast automáticamente después de 3 segundos
//     setTimeout(() => {
//       this.showToast = false;
//     }, 3000);
//   }
// }


