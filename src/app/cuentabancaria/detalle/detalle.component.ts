import { Component, Input, OnInit } from '@angular/core';
// import { CuentaBancaria } from '../../usuarios/cuentaBancaria/cuentaBancaria.component';
import { CuentaBancariaRudy } from '../../registrar-cuenta-bancaria/cuentabancariaRudy';
import { CuentaBancariaService } from '../../registrar-cuenta-bancaria/cuentabancaria.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {


  fotoSeleccionada: File;
   progreso: number = 0;




  constructor(private cuentaBancariService: CuentaBancariaService,
    private activateRoute: ActivatedRoute,
    public modalService: ModalService) {

  }

  @Input() cuentaBancaria: CuentaBancariaRudy;
  titulo: string = "Detalle";

  ngOnInit() {

   /* this.activateRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');

      if (id) {
        this.cuentaBancariService.getCuentaBancaria(id).subscribe(cliente => {
          this.cuentaBancaria = cliente;
        });
      }

    });*/
  }




  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    //fiultramos foto jpg desde windows 
    if (this.fotoSeleccionada.type.indexOf('image') < 0

      //para pdf
     // && this.fotoSeleccionada.type.indexOf('application') < 0
    ) {
      Swal.fire('Error seleeccionar imagen',
        `El archivo debe ser de tipo imagen`, 'error');

      this.fotoSeleccionada = null;
    }
  }


  subirFoto() {

    if (!this.fotoSeleccionada) {
      Swal.fire('Error Upload',
        `Debe seleccionar una foto`, 'error');
    }
    else {
      this.cuentaBancariService.subirFoto(this.fotoSeleccionada,
        this.cuentaBancaria.id).subscribe(event => {

          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          }
          else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cuentaBancaria = response.cliente as CuentaBancariaRudy; //la propiedad cliente vine del back como atributo json

            // this.cuentaBancaria = cliente ;
            //para la foto actualizando en time real
            this.modalService.notificarUpload.emit( this.cuentaBancaria );
          Swal.fire('La foto se ha subido correctamente!',
          response.mensaje, 'success');
          }
          
        });
    }


  }



  cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }



}
