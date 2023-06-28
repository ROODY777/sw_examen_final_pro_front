import { Component, OnInit} from '@angular/core';
import { Usuario } from '../../usuario';
import { UsuarioService } from '../../usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit{

  usuarios: Usuario[];

  constructor(private usuarioService: UsuarioService, private router: Router){}

  ngOnInit(): void {
    this.listaUsuarios();
  }

  private listaUsuarios(){
    this.usuarioService.listarUsuarios().subscribe(dato => {
      this.usuarios = dato;
    });
  }

  actualizarUsuario(id: number){
    this.router.navigate(['actualizar-usuario', id]);
  }

  eliminarUsuario(id: number){
    Swal.fire({
      title: "Seguro que quiere eliminar este usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.usuarioService.eliminarUsuario(id).subscribe(result => {
          console.log(result);
          this.listaUsuarios();
          Swal.fire(
            'Usuario eliminado',
            'El usuario ha sido eliminado con éxito',
            'success'
          );
        });
      }
    });
  }
}
