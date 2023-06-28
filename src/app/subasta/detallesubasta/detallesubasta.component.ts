import { Component, Input, OnInit } from '@angular/core';
import { Subasta } from '../subasta';
import { ModalService } from '../../cuentabancaria/modal.service';
import { InversionService } from 'src/app/inversion.service';
import { Usuario } from 'src/app/usuario';
import { CarteraService } from 'src/app/cartera.service';
import { Inversion } from 'src/app/inversion';
import { AuthService } from 'src/app/services/AuthService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallesubasta',
  templateUrl: './detallesubasta.component.html',
  styleUrls: ['./detallesubasta.component.css']
})
export class DetallesubastaComponent implements OnInit{

  @Input() subastaa: Subasta;
  usuario: Usuario;
  inversion: Inversion = new Inversion();
  tasadiaria : number = 0;
  dias: number;
  saldo: number;
  // porcentaje: string = "0.00";

  constructor(
    // private activateRoute: ActivatedRouteSnapshot,
    public modalService: ModalService,
    private inversionService: InversionService,
    private carteraService: CarteraService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.getCurrentUser()[0];

    const diferenciafecha = new Date(this.subastaa.fechapago).getTime() - new Date(this.subastaa.fechaemision).getTime();
    this.dias = Math.floor(diferenciafecha/(1000*60*60*24));
    this.inversion.retornomensual = ((Math.pow(1 + this.subastaa.retorno / 100, 1.0 / 12.0) - 1) * 100);
    this.tasadiaria = ((Math.pow(1 + this.inversion.retornomensual / 100, 1.0 / 30.0) - 1) * 100);

    this.carteraService.buscarCartera(this.usuario.id, "PEN").subscribe((result: any) => {
      this.saldo = result.cantidad;
    });
  }

  actualizarGanancia() {
    this.inversion.ganancia = parseFloat((this.inversion.monto * (Math.pow((1 + this.tasadiaria / 100), this.dias) - 1)).toFixed(2));
    this.inversion.porcentaje = parseFloat((this.inversion.monto*100/this.subastaa.montototal).toFixed(2));
  }

  registrarInversion() {

    this.inversion.estado = "En cobranza";
    this.inversion.retornomensual = parseFloat(this.inversion.retornomensual.toFixed(2));
    this.inversion.cuentaUsuario = this.usuario;
    this.inversion.subasta = this.subastaa;

    this.inversionService.registrarInversion(this.inversion).subscribe({      
      next: (result: any) => {
        console.log(result);
        Swal.fire({
          title: "Inversión",
          icon: 'success',
          text: 'La inversión se ha registrado con éxito',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if(result.isConfirmed){
            this.clear();
          }
        });
      }, 
      error: (error: any ) => {
        console.log(`Error de servidor: ${error}`);
      }
    });
  }

  clear() {
    this.inversion.monto = null;
    this.inversion.ganancia = 0.00;
    this.inversion.porcentaje = 0.00;
  }

  cerrarModal(){
    this.modalService.cerrarModal();
  }

}
