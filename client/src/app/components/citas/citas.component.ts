import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { cita } from '../../models/cita';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  citas: cita[] = [];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.obtenerCitas();
  }

  obtenerCitas(): void {
    this.citaService.getCitas().subscribe(
      (res: cita[]) => {
        this.citas = res;
      },
      err => console.error(err)
    );
  }
}
