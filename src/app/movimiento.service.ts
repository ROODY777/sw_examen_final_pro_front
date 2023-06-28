import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimiento } from './movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private baseUrl = "http://localhost:8081/movimiento";

  constructor(private httpCliente: HttpClient) { }

  listarMovimientosPorEstado(estado: String):Observable<Movimiento[]>{
    return this.httpCliente.get<Movimiento[]>(`${this.baseUrl}/estado/${estado}`);
  }

  listarMovimientosporNumeroCuentaBancaria(numeroCuentaBancaria: string, page: number = 1, size: number = 10): Observable<Movimiento[]>{
    const params: HttpParams = new HttpParams()
      .set('page', page)
      .set('size', size);

    return this.httpCliente.get<Movimiento[]>(`${this.baseUrl}/numeroCuentaBancaria/${numeroCuentaBancaria}`, { params });
  }

  registrarMovimiento(movimiento: Movimiento):Observable<Object>{
    return this.httpCliente.post<Movimiento>(`${this.baseUrl}`, movimiento);
  }

  editarEstadoMovimiento(movimiento: Movimiento):Observable<Object>{
    return this.httpCliente.put<Movimiento>(`${this.baseUrl}/editar`, movimiento);
  }

  buscarPorId(id: number):Observable<Movimiento>{
    return this.httpCliente.get<Movimiento>(`${this.baseUrl}/${id}`);
  }
}
