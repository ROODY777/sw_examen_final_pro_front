import { Component, OnInit } from '@angular/core';
import { Cartera } from 'src/app/cartera';
import { CarteraService } from 'src/app/cartera.service';
import { CuentaBancariaService } from 'src/app/cuenta-bancaria.service';
import { Movimiento } from 'src/app/movimiento';
import { MovimientoService } from 'src/app/movimiento.service';
import { AuthService } from 'src/app/services/AuthService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retirar-cuenta-bancaria',
  templateUrl: './retirar-cuenta-bancaria.component.html',
  styleUrls: ['./retirar-cuenta-bancaria.component.css'],
})
export class RetirarCuentaBancariaComponent implements OnInit {
  movimiento: Movimiento = new Movimiento();

  currentTemplate: string = 'retiroTemplate';
  montoUSD: number;
  montoPEN: number;
  MONTO_MIN: number = 5;
  MONTO_MAX: number;

  constructor(
    private carteraService: CarteraService,
    private cuentaBancariaService: CuentaBancariaService,
    private movimientoService: MovimientoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.movimiento.cuentaUsuario = this.authService.getCurrentUser()[0];
    this.carteraService.listarCarteras(this.movimiento.cuentaUsuario.id).subscribe((result: any) => {
        for (let item of result) {
          if (item.moneda.descripcion === 'USD') this.montoUSD = item.cantidad;
          else if (item.moneda.descripcion === 'PEN') this.montoPEN = item.cantidad;
        }
    });
  }

  onRetirar() {
    this.currentTemplate = 'retiroTemplate';
  }

  seleccionarCuenta() {
    console.log(this.movimiento.moneda);
    this.MONTO_MAX = this.movimiento.moneda == 'USD' ? this.montoUSD : this.montoPEN;
  }

  onRetiroExitoso() {
    const isValidMonto = this.movimiento.monto >= this.MONTO_MIN && this.movimiento.monto <= this.MONTO_MAX;
    if (isValidMonto) {
      this.cuentaBancariaService.obtenerCuentaPorUsuarioMoneda(this.movimiento.cuentaUsuario.id,this.movimiento.moneda).subscribe((result) => {
          this.movimiento.cuentaBancariaUsuario = result;
          this.movimiento.estado = 'Pendiente';
          this.movimiento.tipo = 'Retiro';
          this.currentTemplate = 'retiroExitosoTemplate';
      });
    } else {
      console.log(`monto: ${this.movimiento.monto}, min:${this.MONTO_MIN}, max:${this.MONTO_MAX}`);
    }
  }

  crearMovimiento() {
    this.movimientoService.registrarMovimiento(this.movimiento).subscribe((result: Movimiento) => {
      console.log(result);
      Swal.fire({
        title: 'Retiro creado exitosamente',
        text: 'Retiro aceptado',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) window.location.reload();
      });
    },
    (error) => {
      console.error(error);
    });
  }
}
