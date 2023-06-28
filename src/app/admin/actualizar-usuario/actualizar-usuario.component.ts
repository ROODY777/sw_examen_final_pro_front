import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../usuario';
import { UsuarioService } from '../../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent implements OnInit{

  id: number;
  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.usuarioService.obtenerUsuarioPorId(this.id).subscribe(dato => {
      this.usuario = dato;
    });
  }

  redirectUsuarios(){
    this.router.navigate(['/usuarios']);
    console.log("Se actualizó el usuairo "+this.id);
  }

  onSubmit(){
    this.usuarioService.actualizarUsuario(this.usuario, this.id).subscribe(dato =>{
      this.redirectUsuarios();
    }, error => console.log(error));
  }
  
}
