import { Component, OnInit } from '@angular/core';
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
  maxOutputTokens: 100,
  responseMimeType: "text/plain",
}

const model = googleGenAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  ...generationConfig
});

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Almacena los mensajes en el chat
  chatMessages: { text: string, isUser: boolean }[] = [];
  userMessage: string = '';

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


  constructor(private router: Router, private authService: AuthService, private userService: UserService) {}

  // ngOnInit(): void {}

  ngOnInit(): void {

        this.userService.getUserProfile().subscribe(
          (user) => {
            this.user = user;
            console.log('Imagen URL:', this.user.imagen_url); // // Asigna los datos del usuario al objeto 'user'
          },
          (error) => {
            console.error('Error al obtener el perfil del usuario:', error);
          }
        );

  }





  // Enviar el mensaje del usuario y obtener la respuesta de Gemini
  async sendMessage() {
    if (this.userMessage.trim() === '') {
      return;
    }

    // Agregar el mensaje del usuario al chat
    this.chatMessages.push({ text: this.userMessage, isUser: true });

    // Enviar el mensaje a Gemini
    const response = await this.TestGemini(this.userMessage);

    // Agregar la respuesta de Gemini al chat
    this.chatMessages.push({ text: response, isUser: false });

    // Limpiar el input
    this.userMessage = '';
  }

  // Detectar "Enter" en el campo de entrada y enviar mensaje
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  // // Llamar a la API de Gemini y obtener la respuesta
  // async TestGemini(prompt: string): Promise<string> {




  //   try {
  //     const result = await model.generateContent(prompt);
  //     const response = await result.response;
  //     return response.text(); // Devuelve la respuesta en texto
  //   } catch (error) {
  //     console.error('Error al obtener la respuesta de Gemini:', error);
  //     return 'Lo siento, hubo un error al procesar tu solicitud.';
  //   }
  // }

  // Llamar a la API de Gemini y obtener la respuesta
async TestGemini(prompt: string): Promise<string> {
  // Personaliza el prompt para que actúe como un orientador
  const formattedPrompt = `Eres un orientador básico de psicología. Ayuda al estudiante con el siguiente mensaje: "${prompt}"`;

  try {
    const result = await model.generateContent(formattedPrompt);
    const response = await result.response;
    return response.text(); // Devuelve la respuesta en texto
  } catch (error) {
    console.error('Error al obtener la respuesta de Gemini:', error);
    return 'Lo siento, hubo un error al procesar tu solicitud.';
  }
}

}
