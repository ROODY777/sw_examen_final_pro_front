import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private baseUrl = "http://localhost:8081/usuario";

  constructor(private httpClient: HttpClient) { }

  listarUsuarios():Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}`);
  }

  registrarUsuario(usuario:Usuario):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, usuario);
  }

  actualizarUsuario(usuario: Usuario, id: number):Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, usuario);
  }

  obtenerUsuarioPorId(id: number):Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  eliminarUsuario(id: number):Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  login(usuario: Usuario):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/login`, usuario);
  }
  
  listarUsuarioPorCorreo(correo:String):Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${this.baseUrl}/correo/${correo}`);
  }
}
