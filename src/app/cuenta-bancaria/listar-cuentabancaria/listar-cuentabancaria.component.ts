import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaBancariaService } from '../../registrar-cuenta-bancaria/cuentabancaria.service';
import { CuentaBancariaRudy } from '../../registrar-cuenta-bancaria/cuentabancariaRudy';
import Swal from 'sweetalert2';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/services/AuthService.service';
import { Usuario } from 'src/app/usuario';
import { ModalService } from '../../cuentabancaria/modal.service';

@Component({
  selector: 'app-listar-cuentabancaria',
  templateUrl: './listar-cuentabancaria.component.html',
  styleUrls: ['./listar-cuentabancaria.component.css']
})
export class ListarCuentabancariaComponent implements OnInit {

  private cliente: CuentaBancariaRudy = new CuentaBancariaRudy();

  cuentaBancaria: CuentaBancariaRudy[] = [];
  errores: string[];


  cuentaBancariaSeleccionada : CuentaBancariaRudy;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private cuentabancariaService: CuentaBancariaService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private modalService: ModalService
  ) { }


  abrirModal(cuentaBancaria : CuentaBancariaRudy){
    this.cuentaBancariaSeleccionada = cuentaBancaria;
    this.modalService.abrirModal();
  }



  ngOnInit(): void {
     debugger;

     // ROODY COMENTE
 /*    this.cuentabancariaService.getTodosCuentaBancaria()
      .subscribe(
        response => this.cuentaBancaria = response
      );
 */
        this.CuentaBancariaListaXIdCuentaUsuario();
        this.modalService.notificarUpload.subscribe(cliente => {
          this.cuentaBancaria =  this.cuentaBancaria.map(clienteOrigianl =>{
            if(cliente.id ==  clienteOrigianl.id){
              clienteOrigianl.archivo = cliente.archivo;
            }
            return clienteOrigianl;
          })
        })
    
  }

  CuentaBancariaListaXIdCuentaUsuario(): void {
    
    var usuario = this.authService.usuario;
    console.log(usuario.nombres);

    var myObj = new Usuario();
    myObj.id = this.authService.usuario ? this.authService.usuario[0].id : null,
    myObj.nombres = this.authService.usuario ? this.authService.usuario[0].nombres : null
var id = myObj.id 
   // this.cuentaBancaria = myObj;
    this.cuentabancariaService.CuentaBancariaListaXIdCuentaUsuario(id)
    .subscribe(
      response => this.cuentaBancaria = response
    );
  }



  /* update(): void {
    console.log(this.cliente);
    this.cuentabancariaService.update(this.cliente)
      .subscribe(
        json => {
          Swal.fire('Cuenta bancaria actualizado', ` ${json.mensaje} : ${json.cliente.nombre}`, 'success');
          this.router.navigate(['/listar-cuenta-bancaria'])
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }
   */

  delete(cliente: CuentaBancariaRudy): void {

    swal.fire({
      title: `¿Esta seguro de eliminar cuenta bancaria con N° ${cliente.numerocuenta} ?`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No ,cancelar',
      showCancelButton: true,

/*     cancelButtonText: 'No ,cancelar'
*/  }).then((result) => {
        //debugger
        if (result.value) {

          this.cuentabancariaService.delete(cliente.id).subscribe(
            response => {
              this.cuentaBancaria = this.cuentaBancaria.filter(cli => cli !== cliente)
              swal.fire(
                'Cuenta bancaria eliminado!',
                'Cuenta bancaria  con exito',
                'success'
              )
            }
          )
        }
      })
  }





}
