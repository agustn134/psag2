export interface User {
  id_usuario?: string;   // ID del usuario
  nombre: string;       // Nombre del usuario
  ape_paterno: string;  // Apellido paterno
  ape_materno: string;  // Apellido materno
  e_mail: string;       // Correo electrónico
  password: string;    // Contraseña (opcional si no deseas incluirla al obtener datos)
  telefono: string;    // Contraseña (opcional si no deseas incluirla al obtener datos)
  grupo: string;    // Contraseña (opcional si no deseas incluirla al obtener datos)
  id_carrera : string; //
  nombre_carrera?: string;
  id_rol?: string; //
  rol_nombre?: string; //
  imagen_url?: string;
}
