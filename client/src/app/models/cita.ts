// export interface cita {
//   id_cita?:string,
//   id_psicologo?:string;
//   id_alumno?:string;
//   id_consultorio?:string;
//   id_horario?:string;
//   motivo:string;
//   estatus:string;
//   }


export interface cita {
  id_cita: string;
  id_psicologo: string;
  id_alumno: string;
  id_consultorio: string;
  id_horario: string;
  motivo?: string; // Cambiado a opcional
  estatus?: string; // Cambiado a opcional
  correo?: string; // Cambiado a opcional
}
