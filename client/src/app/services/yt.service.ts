import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YtService {

  public apiKey = 'AIzaSyCVWZU1eyZEDZqxwXwX9p_big7Enx6aPkM'; //Mi clave
  public apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) { }

  getVideos(query: string): Observable<any> {
    const url = `${this.apiUrl}/search?key=${this.apiKey}&part=snippet&type=video&q=${query}`;
    return this.http.get(url);
  }
}
