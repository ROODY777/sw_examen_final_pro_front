import { Component, OnInit} from '@angular/core';
import { AuthService } from '../services/AuthService.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-deposito',
  templateUrl: './estadoCuenta.component.html',
  styleUrls: ['./estadoCuenta.component.css']
})
export class EstadoCuenta implements OnInit{
    authService: AuthService;
    usuario: Usuario = new Usuario();
    // tipoUsuario=""

  constructor(private auth: AuthService){
    // this.authService=auth;
    // // Suscribirse al observable currentUser del servicio de AuthService
    // this.authService.currentUser.subscribe(user => {
    //     if (user) {
    //       this.tipoUsuario = user[0].tiposPerfilesUsuario[0].nombre;
    //       this.usuario = user[0];
    //     } else {
    //       this.tipoUsuario = '';
    //       this.usuario = null;
    //     }
    //   });
  }

  ngOnInit(): void {
  }

}
