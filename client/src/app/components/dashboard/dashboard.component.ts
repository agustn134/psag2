// import { Component, OnInit } from '@angular/core';
// import { environment } from '../../../environments/environment';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { User } from '../../models/user';
// import { UserService } from '../../services/user.service';
// import { AuthService } from '../../utils/auth.service';
// import { Router } from '@angular/router';

// const googleGenAI = new GoogleGenerativeAI(environment.API_KEY);

// const generationConfig = {
//   temperature: 0.7, // Reducido para respuestas más coherentes y menos aleatorias
//   topP: 0.9, // Reducido ligeramente para limitar las opciones de palabras a las más probables
//   topK: 40, // Reducido para enfocarse en palabras más relevantes
//   maxOutputTokens: 20, // Ajustado para permitir respuestas más detalladas si es necesario
//   responseMimeType: 'text/plain',
// };

// const model = googleGenAI.getGenerativeModel({
//   model: 'gemini-1.5-flash',
//   ...generationConfig,
// });

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],
// })
// export class DashboardComponent implements OnInit {
//   // Almacena los mensajes en el chat
//   chatMessages: { text: string; isUser: boolean }[] = [];
//   userMessage: string = '';

//   user: User = {
//     nombre: '',
//     ape_paterno: '',
//     ape_materno: '',
//     e_mail: '',
//     telefono: '',
//     grupo: '',
//     imagen_url: '',
//     password: '',
//     id_carrera: '',
//     id_rol: '',
//   };

//   constructor(
//     private router: Router,
//     private authService: AuthService,
//     private userService: UserService
//   ) {}
//   ngOnInit(): void {
//     this.userService.getUserProfile().subscribe(
//       (user) => {
//         this.user = user;
//         console.log('Imagen URL:', this.user.imagen_url); // // Asigna los datos del usuario al objeto 'user'
//       },
//       (error) => {
//         console.error('Error al obtener el perfil del usuario:', error);
//       }
//     );
//   }

//   // Enviar el mensaje del usuario y obtener la respuesta de Gemini
//   isLoading = false;

//   async sendMessage() {
//     if (this.userMessage.trim() === '') {
//       return;
//     }

//     this.chatMessages.push({ text: this.userMessage, isUser: true });
//     this.userMessage = '';
//     this.isLoading = true; // Activar indicador de carga

//     const response = await this.TestGemini(this.userMessage);

//     this.chatMessages.push({ text: response, isUser: false });
//     this.isLoading = false; // Desactivar indicador de carga
//      // Guardar el historial en localStorage después de cada mensaje
//   localStorage.setItem('chatMessages', JSON.stringify(this.chatMessages));
//   }




//   // Detectar "Enter" en el campo de entrada y enviar mensaje
//   handleKeydown(event: KeyboardEvent) {
//     if (event.key === 'Enter') {
//       this.sendMessage();
//     }
//   }

//   async TestGemini(prompt: string): Promise<string> {
//     const conversationContext = this.chatMessages
//       .slice(-3) // Extrae los últimos 3 mensajes para dar contexto
//       .map((msg) => `${msg.isUser ? 'Estudiante' : 'Asistente'}: ${msg.text}`)
//       .join('\n');

//     const formattedPrompt = `Contexto:\n${conversationContext}\n\nEres un orientador de psicología. Responde al siguiente mensaje: "${prompt}"`;

//     try {
//       const result = await model.generateContent(formattedPrompt);
//       const response = await result.response;
//       return response.text(); // Devuelve la respuesta en texto
//     } catch (error) {
//       console.error('Error al obtener la respuesta de Gemini:', error);
//       return 'Lo siento, hubo un error al procesar tu solicitud.';
//     }
//   }




// }



import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../utils/auth.service';
import { Router } from '@angular/router';

const googleGenAI = new GoogleGenerativeAI(environment.API_KEY);
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 20,
  responseMimeType: 'text/plain',
};
const model = googleGenAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  ...generationConfig,
});

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  chatMessages: { text: string; isUser: boolean }[] = [];
  userMessage: string = '';
  isLoading = false;

  user: User = {
    nombre: '',
    ape_paterno: '',
    ape_materno: '',
    e_mail: '',
    telefono: '',
    grupo: '',
    imagen_url: '',
    password: '',
    id_carrera: '',
    id_rol: '',
  };

  @ViewChild('chatDisplay') chatDisplay!: ElementRef; // Referencia al contenedor del chat

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    );
  }

  async sendMessage() {
    if (this.userMessage.trim() === '') {
      return;
    }

    // Agregar el mensaje del usuario al chat
    this.chatMessages.push({ text: this.userMessage, isUser: true });
    this.scrollToBottom(); // Desplazar al último mensaje

    this.isLoading = true;

    // Enviar el mensaje a Gemini y obtener la respuesta
    const response = await this.TestGemini(this.userMessage);
    this.isLoading = false;

    // Agregar la respuesta de Gemini al chat
    this.chatMessages.push({ text: response, isUser: false });
    this.scrollToBottom(); // Desplazar al último mensaje

    // Limpiar el input
    this.userMessage = '';
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  async TestGemini(prompt: string): Promise<string> {
    const formattedPrompt = `Eres un orientador básico de psicología. Ayuda al estudiante con el siguiente mensaje: "${prompt}"`;

    try {
      const result = await model.generateContent(formattedPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error al obtener la respuesta de Gemini:', error);
      return 'Lo siento, hubo un error al procesar tu solicitud.';
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatDisplay.nativeElement.scrollTop = this.chatDisplay.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error al desplazar al último mensaje:', err);
    }
  }
}
