import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CuentaBancaria } from './cuenta-bancaria';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancariaService {

  private baseUrl = "http://localhost:8081/cuenta";

  constructor(private httpClient: HttpClient) { }


   listarUsuarios():Observable<CuentaBancaria[]>{
    return this.httpClient.get<CuentaBancaria[]>(`${this.baseUrl}`);
  }

  obtenerUsuarioPorId(id: number):Observable<CuentaBancaria>{
    return this.httpClient.get<CuentaBancaria>(`${this.baseUrl}/${id}`);

  }
  listarCuentas():Observable<CuentaBancaria[]>{
    return this.httpClient.get<CuentaBancaria[]>(`${this.baseUrl}`);
  }

  obtenerCuentaPorUsuario(id: number):Observable<CuentaBancaria[]>{
    return this.httpClient.get<CuentaBancaria[]>(`${this.baseUrl}/${id}`);
  }

  obtenerCuentaAdmin(banco: string, moneda: string):Observable<CuentaBancaria>{
    return this.httpClient.get<CuentaBancaria>(`${this.baseUrl}/admin/${banco}/${moneda}`);
  }

  obtenerCuentaPorUsuarioMoneda(id: number, moneda: string):Observable<CuentaBancaria>{
    return this.httpClient.get<CuentaBancaria>(`${this.baseUrl}/${id}/${moneda}`);
  } 

  }



  

