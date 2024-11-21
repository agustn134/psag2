import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CitaService } from '../../services/cita.service';
import { cita } from '../../models/cita';
import { ToastrService } from 'ngx-toastr'; // Asegúrate de importar ToastrService
import { UserService } from '../../services/user.service';
import { ConsultorioService } from '../../services/consultorio.service';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css'],
})
export class CitasComponent implements OnInit {
  citas: cita[] = [];
  psicologos: any[] = []; // Lista de psicólogos
  consultorios: any[] = []; // Lista de
  psychologists: any[] = [];
  loading = true;
  idRol: number | null = null; // Propiedad para almacenar el rol del usuario


  constructor(
    private citaService: CitaService,
    private toastr: ToastrService,
    private userService: UserService,
    private consultorioService: ConsultorioService,
    private router: Router
  ) {}



  ngOnInit(): void {
    const userDetails = this.userService.getUserDetailsFromToken();

    if (userDetails) {
      const { id_usuario, id_rol } = userDetails;
      this.idRol = id_rol; // Asignar el id_rol del usuario actual

      if (id_rol === 1) {
        // Si es un alumno, obtener citas por id_alumno
        this.citaService.getCitasByAlumno(id_usuario).subscribe(
          (citas) => (this.citas = citas),
          (err) => console.error('Error obteniendo citas para alumno:', err)
        );
      } else if (id_rol === 2) {
        // Si es un psicólogo, obtener citas por id_psicologo
        this.citaService.getCitasByPsicologo(id_usuario).subscribe(
          (citas) => (this.citas = citas),
          (err) => console.error('Error obteniendo citas para psicólogo:', err)
        );
      } else if (id_rol === 3) {
        // Rol diferente o no reconocido
        this.citaService.getCitas().subscribe(
          (citas) => (this.citas = citas),
          (err) => console.error('Error obteniendo citas para psicólogo:', err)
        );
      }
    } else {
      console.error('Detalles del usuario no disponibles. Redirigiendo...');
      // Maneja redirección a login o error
    }

    this.userService.getPsychologists().subscribe({
      next: (data) => {
          this.psychologists = data;  // Asegúrate de que 'data' contiene los psicólogos
          console.log(this.psychologists); // Verifica en la consola los datos recibidos

      },
      error: (err) => {
          console.error('Error al obtener psicólogos:', err);
      },
      });

    // Cargar psicólogos y consultorios
    // this.userService
    //   .getPsychologists()
    //   .subscribe((data) => (this.psicologos = data));
    this.consultorioService
      .getConsultorios()
      .subscribe((data) => (this.consultorios = data));
    // // Cargar psicólogos para las cards
    // this.citaService
    //   .getEmailsByRole()
    //   .subscribe((data) => (this.psychologists = data));


  }

  obtenerCitas(): void {
    this.citaService.getCitas().subscribe(
      (res: cita[]) => {
        this.citas = res;
      },
      (err) => console.error(err)
    );
  }

  actualizarEstatus(id: string, nuevoEstatus: string): void {
    this.citaService.updateEstatus(id, nuevoEstatus).subscribe(
      (res) => {
        console.log(res);
        this.obtenerCitas(); // Actualizar la lista de citas después de cambiar el estatus
        console.log('ID:', id);
        console.log('Estatus:', nuevoEstatus);
        // Mostrar mensaje de éxito con Toastr
        this.toastr.success(
          'El estatus se actualizó correctamente y el correo fue enviado.',
          'Éxito'
        );
        console.log('Correo enviado correctamente:', res);
      },
      (err) => {
        // Mostrar mensaje de error con Toastr
        this.toastr.error(
          'Hubo un error al actualizar el estatus y enviar el correo.',
          'Error'
        );
        console.error('Error al enviar el correo:', err);
        console.error(err);
      }
    );
  }

  getPsychologistssendemail(): void {
    this.userService.getPsychologistsAndSendEmail().subscribe({
      next: (data) => {
        this.psychologists = data; // Guarda los datos de los psicólogos
        console.log(data); // Verifica la respuesta aquí
        // Mostrar mensaje de éxito con Toastr
        this.toastr.success(
          'El Psicologo fue notificado, el correo fue enviado.',
          'Correo Enviado al Psicologo'
        );
      },
      error: (err) => {
        console.error('Error al obtener psicólogos:', err);
        // Mostrar mensaje de error con Toastr
        this.toastr.error(
          'Hubo un error al enviar notificación y no se envio el correo.',
          'Error Enviar Correo al psicologo'
        );
      },
    });
  }

}
  // ///servicio al hacer clic en el botón de enviar correo para el conferenciante
  //   redirectToConference() {
  //     this.userService.getPsychologistsAndSendEmail().subscribe(
  //         response => {
  //             console.log('Correo enviado:', response);
  //             this.router.navigate(['/conference']);
  //         },
  //         error => {
  //             console.error('Error al enviar correos:', error);
  //         }
  //     );
  // }
