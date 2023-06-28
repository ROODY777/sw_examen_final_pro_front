import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8081/media";

  uploadFile(formData: FormData):Observable<any>{
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }
}
