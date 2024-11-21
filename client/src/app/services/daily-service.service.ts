import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailyService {
  private apiUrl = 'https://api.daily.co/v1';

  constructor(private http: HttpClient) {}

  // getMeetingToken(roomName: string, isOwner: boolean): Observable<any> {
  //   const url = `${this.apiUrl}/meeting-tokens`;
  //   const body = {
  //     properties: {
  //       room_name: roomName,
  //       is_owner: isOwner,
  //       start_video_off: !isOwner,
  //       start_audio_off: !isOwner,
  //     },
  //   };
  //   const headers = new HttpHeaders({
  //     Authorization: 'Bearer 5126c32a636f8b039623d820baf95cf36fd2009db2c11b03e70bbb3918144a8d',
  //     'Content-Type': 'application/json',
  //   });

  //   return this.http.post(url, body, { headers });
  //   console.log('Enviando solicitud a Daily.co con estos encabezados:', headers);

  // }

  getMeetingToken(roomName: string, isOwner: boolean): Observable<any> {
    const url = `${this.apiUrl}/meeting-tokens`;
    const body = {
      properties: {
        room_name: roomName,
        is_owner: isOwner,
        start_video_off: !isOwner,
        start_audio_off: !isOwner,
      },
    };
    const headers = new HttpHeaders({
      Authorization: 'Bearer 5126c32a636f8b039623d820baf95cf36fd2009db2c11b03e70bbb3918144a8d',
      'Content-Type': 'application/json',
    });

    console.log('Solicitud POST a Daily.co:', {
      url,
      body,
      headers: headers.keys(),
    });

    return this.http.post(url, body, { headers });
  }

}
