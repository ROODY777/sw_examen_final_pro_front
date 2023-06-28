import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../usuario';
import jwt_decode from "jwt-decode";
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//ROODY

private _usuario: Usuario;


  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;
  private baseUrl = "http://localhost:8081/usuario";

  constructor(private router: Router, private http: HttpClient , private usuarservice:UsuarioService) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    const token = localStorage.getItem("currentUser");
    console.log(token);
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.sub;
    } else {
      return null;
    }
  }

  public setCurrentUser(user: Usuario) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
  
  login(usuario: Usuario){
    return this.http.post<any>(`${this.baseUrl}/login`, usuario).subscribe(
      response => {
        if (response && response.tokenAcceso) {
          const token=response.tokenAcceso;
          const decodedToken: any = jwt_decode(token);
          const email:string=decodedToken.sub;
          this.usuarservice.listarUsuarioPorCorreo(email).subscribe((res:any)=>{
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.currentUserSubject.next(res);
            const tipoPerfil=res[0].tiposPerfilesUsuario[0].nombre.toLowerCase();
            console.log(tipoPerfil)
            this.router.navigate([`/${tipoPerfil}/dashboard`]);
            console.log(res);
           
          })
        }
      }
    )
  }

  register(usuario: Usuario): Observable<any> {
    return new Observable((observer) => {
      this.http.post<any>(`${this.baseUrl}`, usuario).subscribe(
        (response: any) => {
          if(response){
            this.usuarservice.listarUsuarioPorCorreo(usuario.email).subscribe((res:any)=>{
              localStorage.setItem('currentUser', JSON.stringify(res));
              this.currentUserSubject.next(res);
              observer.next(response);
              observer.complete();
            })
            
          }
        },
        (error: any) => {
          observer.error(error);
        }
      );
    });
  }
  

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): Usuario {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    return currentUser ? currentUser : null;
  }

 //ROODY
  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario 
    }
    else if(this._usuario == null && localStorage.getItem('currentUser')){
     this._usuario = JSON.parse(localStorage.getItem('currentUser')) as Usuario;
     return this._usuario;
    }
    return new Usuario();
  }
}
