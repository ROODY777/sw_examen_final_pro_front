import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cartera } from './cartera';

@Injectable({
  providedIn: 'root'
})
export class CarteraService {

  private baseUrl = "http://localhost:8081/usuario/cartera";

  constructor(private httpCliente: HttpClient) { }

  listarCarteras(id: number):Observable<Cartera[]>{
    return this.httpCliente.get<Cartera[]>(`${this.baseUrl}/${id}`);
  }

  actualizarCartera(cartera: Cartera):Observable<Object>{
    return this.httpCliente.put<Object>(`${this.baseUrl}`, cartera);
  }

  buscarCartera(id: number, moneda: string):Observable<Object>{
    return this.httpCliente.get<Object>(`${this.baseUrl}/${id}/${moneda}`);
  }
}
