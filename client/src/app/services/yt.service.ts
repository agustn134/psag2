import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YtService {
  //private apiKey = 'AIzaSyBcooOo0Ow2K-d5Gc_VzXt_3l4nLzs7PcI';
  //private  = 'AIzaSyCmzTulvkHw2x236eZPgNUuLSoSrWHKVt0';
  private apiKey = 'AIzaSyCVWZU1eyZEDZqxwXwX9p_big7Enx6aPkM'; //Mi clave
  private apiUrl = 'https://www.googleapis.com/youtube/v3';
  
  constructor(private http: HttpClient) { }

  getVideos(query: string): Observable<any> {
    const url = `${this.apiUrl}/search?key=${this.apiKey}&part=snippet&type=video&q=${query}`;
    return this.http.get(url);
  }
}
