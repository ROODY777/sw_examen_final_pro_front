import { Component, OnInit, Renderer2, ElementRef , ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/AuthService.service';
import { Usuario } from 'src/app/usuario';

@Component({
    selector: 'app-dashboardUsuario',
    templateUrl: './dashboardUsuario.component.html',
    styleUrls: ['./dashboardUsuario.component.css']
  })

  export class DashboardUsuarioComponent implements OnInit {
    authService: AuthService;
    usuario: Usuario = new Usuario();
    tipoUsuario=""

  constructor(private auth: AuthService){
    this.authService=auth;
    this.authService.currentUser.subscribe(user => {
      console.log(user);
        if (user) {
          this.tipoUsuario = user[0].tiposPerfilesUsuario[0].nombre;
          this.usuario = user[0];
        } else {
          this.tipoUsuario = '';
          this.usuario = null;
        }
      });
  }

    ngOnInit():void {
  
    }

  }