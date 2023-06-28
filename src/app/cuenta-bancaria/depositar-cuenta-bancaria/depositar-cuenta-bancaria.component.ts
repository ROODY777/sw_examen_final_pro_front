import { Component, OnInit } from '@angular/core';
import { CuentaBancaria } from 'src/app/cuenta-bancaria';
import { CuentaBancariaService } from 'src/app/cuenta-bancaria.service';
import { MediaService } from 'src/app/media.service';
import { Movimiento } from 'src/app/movimiento';
import { MovimientoService } from 'src/app/movimiento.service';
import { AuthService } from 'src/app/services/AuthService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-depositar-cuenta-bancaria',
  templateUrl: './depositar-cuenta-bancaria.component.html',
  styleUrls: ['./depositar-cuenta-bancaria.component.css'],
})
export class DepositarCuentaBancariaComponent implements OnInit {
  opciones: any[] = [];
  cuentaSeleccionada: number;
  bancoSeleccionado: string;
  cuentaAdmin: CuentaBancaria = new CuentaBancaria();
  cuentaInversionista: CuentaBancaria = new CuentaBancaria();
  movimiento: Movimiento = new Movimiento();

  url?: string;
  currentTemplate: string = 'tipoDepositoTemplate';
  firmado: boolean = false;

  constructor(
    private movimientoService: MovimientoService,
    private cuentaBancariaService: CuentaBancariaService,
    private mediaService: MediaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.movimiento.cuentaUsuario = this.authService.getCurrentUser()[0];
    this.cuentaBancariaService.obtenerCuentaPorUsuario(this.movimiento.cuentaUsuario.id).subscribe((result) => {
        this.opciones = result.map((cuenta) => ({
          id: cuenta.id,
          descripcion: `${cuenta.moneda.descripcion} | ${cuenta.banco.descripcion} | ${cuenta.numerocuenta}`,
        }));
        console.log(this.opciones);
      });
  }

  seleccionarCuenta() {
    let opcionSeleccionada = this.opciones.find((opcion) => opcion.id == this.cuentaSeleccionada);
    if (opcionSeleccionada) {
      let datos = opcionSeleccionada.descripcion.split(' | ');
      this.movimiento.moneda = datos[0];
      this.bancoSeleccionado = datos[1];
      this.cuentaInversionista.id = opcionSeleccionada.id;
    }
  }

  upload(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe((response) => {
        console.log('response', response);
        this.url = response.url;
      });
    }
  }

  onTipoDeposito() {
    this.currentTemplate = 'tipoDepositoTemplate';
  }

  onBancoDeposito() {
    if (this.movimiento.moneda && this.movimiento.monto && this.firmado) {
      this.cuentaBancariaService.obtenerCuentaAdmin(decodeURIComponent(this.bancoSeleccionado),this.movimiento.moneda).subscribe((dato) => {
          console.log(dato);
          this.cuentaAdmin = dato;
          this.movimiento.estado = "Pendiente";
          this.movimiento.tipo = "Depósito";
          this.currentTemplate = 'bancoDepositoTemplate';
          this.movimiento.cuentaBancariaUsuario = this.cuentaInversionista;
          console.log(this.movimiento);
        });
    } else {
      console.log('Datos inválidos');
    }
  }

  confirmarPago() {
    this.movimientoService.registrarMovimiento(this.movimiento).subscribe((result: Movimiento) => {
      console.log(result);
      Swal.fire({
        title: 'Depósito creado exitosamente',
        text: 'Depósito aceptado',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if(result.isConfirmed)  window.location.reload();
      });
    },
    (error) => {
      console.error(error);
    });
  }
}
