import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subasta } from './subasta/subasta';

@Injectable({
  providedIn: 'root'
})
export class SubastaService {

  private baseUrl = "http://localhost:8081/subasta";

  constructor(private httpClient: HttpClient) { }

  registrarSubasta(subasta: Subasta):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/registro`, subasta);
  }
}
