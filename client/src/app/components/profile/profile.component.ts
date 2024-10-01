// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../services/user.service';
// import { User } from '../../models/user'; // Asegúrate de que esta ruta sea correcta

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css'], // Asegúrate de que sea 'styleUrls' y no 'styleUrl'
// })
// export class ProfileComponent implements OnInit {
//   // user!: User; // Indica que esta propiedad se asignará más adelante
//   isEditing: boolean = false; // Estado para manejar el modo de edición


//   user: User = {
//     nombre: '',
//     ape_paterno: '',
//     ape_materno: '',
//     e_mail: '',
//     telefono: '',
//     grupo: '',
//     imagen_url: '',
//   };

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.getUserById();
//   }

//   getUserById(): void {
//     const userId = this.userService.getUserIdFromToken(); // Obtiene el ID del usuario desde el token
//     if (userId) {
//       this.userService.getUserById(userId).subscribe(
//         (data: User) => {
//           this.user = data; // Asigna los datos del usuario a la propiedad 'user'
//         },
//         (error) => {
//           console.error('Error fetching user data:', error);
//         }
//       );
//     } else {
//       console.error('No user ID found in token');
//     }
//   }

//   // Método para habilitar la edición
//   toggleEdit(): void {
//     this.isEditing = !this.isEditing; // Cambia entre modo de edición y visualización
//   }

//   saveChanges(): void {
//     const userId = this.userService.getUserIdFromToken();
//     if (userId && this.user) {
//       this.userService.updateUser(userId, this.user).subscribe(
//         response => {
//           console.log('Usuario actualizado:', response);
//           this.isEditing = false; // Cambiar a modo de visualización después de guardar
//           // Mostrar mensaje de éxito aquí
//         },
//         error => {
//           console.error('Error al actualizar el usuario:', error);
//           // Mostrar un mensaje de error más claro aquí
//         }
//       );
//     } else {
//       console.error('No se pudo obtener el ID del usuario o el objeto user está vacío.');
//       // Mostrar mensaje de error si el ID o user es inválido
//     }
//   }

// }


import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'], // Asegúrate de que sea 'styleUrls' y no 'styleUrl'
})
export class ProfileComponent implements OnInit {

  isEditing: boolean = false; // Estado para manejar el modo de edición
  errorMessage: string = ''; // Para almacenar mensajes de error
  successMessage: string = ''; // Para almacenar mensajes de éxito
  isImageModalOpen: boolean = false;

  user: User = {
    nombre: '', // Nombre del usuario
    ape_paterno: '', // Apellido paterno
    ape_materno: '', // Apellido materno
    e_mail: '', // Correo electrónico
    telefono: '', // Teléfono
    grupo: '', // Grupo al que pertenece el usuario
    imagen_url: '',
    password: '',
    id_carrera: '',
    id_rol: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserById(); // Llamar al método para obtener el usuario al cargar el componente
  }

  // Método para obtener los datos del usuario
  getUserById(): void {
    const userId = this.userService.getUserIdFromToken(); // Obtiene el ID del usuario desde el token
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (data: User) => {
          this.user = data; // Asigna los datos del usuario a la propiedad 'user'
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
          this.errorMessage = 'No se pudieron obtener los datos del usuario.';
        }
      );
    } else {
      console.error('No se encontró el ID del usuario en el token.');
      this.errorMessage = 'No se encontró el ID del usuario en el token.';
    }
  }

  // Método para habilitar la edición del perfil
  toggleEdit(): void {
    this.isEditing = !this.isEditing; // Alterna entre modo de edición y visualización
  }

  // Método para guardar los cambios del perfil del usuario
  saveChanges(): void {
    const userId = this.userService.getUserIdFromToken(); // Obtiene el ID del usuario desde el token

    if (userId && this.user) {
      this.userService.updateUser(userId, this.user).subscribe(
        (response) => {
          console.log('Usuario actualizado correctamente:', response);
          this.isEditing = false; // Cambiar a modo de visualización después de guardar
          this.successMessage = 'Perfil actualizado correctamente.'; // Mensaje de éxito
        },
        (error) => {
          console.error('Error al actualizar el perfil del usuario:', error);
          this.errorMessage = 'Error al actualizar el perfil. Por favor, intenta nuevamente.'; // Mensaje de error
        }
      );
    } else {
      console.error('No se pudo obtener el ID del usuario o el objeto user está vacío.');
      this.errorMessage = 'No se pudo obtener el ID del usuario o el objeto está vacío.';
    }
  }


   // Método para abrir el modal de la imagen
   openImageModal(): void {
    this.isImageModalOpen = true;
  }

  // Método para cerrar el modal de la imagen
  closeImageModal(): void {
    this.isImageModalOpen = false;
  }

  // Método para cambiar la imagen
  changeImage(): void {
    // Aquí puedes implementar la lógica para cambiar la imagen,
    // ya sea mediante un input de tipo file o un diálogo de selección de imagen.
    console.log("Cambiar imagen"); // Lógica para cambiar la imagen
  }


  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      // Aquí puedes manejar la subida del archivo a tu servidor
      // y actualizar la URL de la imagen del usuario.
      console.log('Imagen seleccionada:', file);
      // Ejemplo de actualizar la URL de la imagen
      // this.user.imagen_url = 'url_del_nuevo_archivo';
    }
  }



}
