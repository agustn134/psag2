import { Component, OnInit } from '@angular/core';
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

  constructor(
    private citaService: CitaService,
    private toastr: ToastrService,
    private userService: UserService,
    private consultorioService: ConsultorioService
  ) {}

  ngOnInit(): void {
    this.obtenerCitas();
    // Obtener la lista de psicólogos desde el backend
    this.userService.getPsychologists().subscribe((data) => {
      this.psicologos = data; // Asignar los psicólogos obtenidos a la variable
    });

    // Obtener la lista de consultorios desde el backend
    this.consultorioService.getConsultorios().subscribe((data) => {
      this.consultorios = data; // Asignar los psicólogos obtenidos a la variable
    });

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

  enviarcorreoEstatus() {}
}
