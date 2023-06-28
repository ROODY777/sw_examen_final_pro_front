import { Component, OnInit } from '@angular/core';
import { Cartera } from 'src/app/cartera';
import { CarteraService } from 'src/app/cartera.service';
import { Movimiento } from 'src/app/movimiento';
import { MovimientoService } from 'src/app/movimiento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-movimientos',
  templateUrl: './listar-movimientos.component.html',
  styleUrls: ['./listar-movimientos.component.css']
})
export class ListarMovimientosComponent implements OnInit{
  movimientoEdit: Movimiento = new Movimiento();
  movimientos: Movimiento[];
  estado: string;
  cartera: Cartera = new Cartera();

  constructor(private movimientoService: MovimientoService, private carteraService: CarteraService){}

  ngOnInit(): void {
    this.listarMovimientos();
  }

  listarMovimientos(){
    this.estado = "Pendiente";
    this.movimientoService.listarMovimientosPorEstado(this.estado).subscribe(result => {
      this.movimientos = result;
    });
  }

  editarMovimiento(id: number, estado: string){ 
    this.movimientoEdit.id = id;
    this.movimientoEdit.estado = estado;
    this.movimientoService.editarEstadoMovimiento(this.movimientoEdit).subscribe((result: Movimiento) => {
      if (estado != "Aprobado") {
        Swal.fire({
          title: `Movimiento ${result.tipo} de ${result.cuentaUsuario.nombres} rechazado exitosamente`,
          text: "Movimiento rechazado",
          icon: 'success'
        });
        this.listarMovimientos();
        return;
      }
      this.movimientoEdit = result;
      this.carteraService.buscarCartera(this.movimientoEdit.cuentaUsuario.id, this.movimientoEdit.moneda).subscribe((result: Cartera) => {
        this.cartera = result;
        this.cartera.cantidad = result.cantidad + (this.movimientoEdit.tipo == "Depósito" ? this.movimientoEdit.monto : -this.movimientoEdit.monto);
        this.carteraService.actualizarCartera(this.cartera).subscribe((result: Cartera) => {              
          Swal.fire({
            title: `Movimiento ${this.movimientoEdit.tipo} de ${this.movimientoEdit.cuentaUsuario.nombres} aprobado exitosamente`,
            text: "Movimiento aprobado",
            icon: 'success'
          });
          this.listarMovimientos();
        });
      });
    });
  }
}
