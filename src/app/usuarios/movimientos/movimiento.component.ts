import { MovimientoService } from 'src/app/movimiento.service';
import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/AuthService.service';
import { Usuario } from '../../usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuentaBancariaService } from 'src/app/cuenta-bancaria.service';
import { CuentaBancaria } from 'src/app/cuenta-bancaria';
import { Movimiento } from 'src/app/movimiento';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.css']
})
export class MovimientoComponent implements OnInit{
    usuario: Usuario = new Usuario();
    cuentaBancaria: CuentaBancaria = new CuentaBancaria();

    movimientos: Movimiento[] = [];
    paginationSize: number[];
    totalPages: number = 0;
    numeroCuentaBancaria?: string;

    consultaxNombreCuentaBancariaForm?: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private cuentaBancariaService: CuentaBancariaService,
    private movimientoService: MovimientoService
  ){
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
    this.initConsultaXCuentaBancariaForm();
  }

  //Inicializacion de formulario de consulta
  private initConsultaXCuentaBancariaForm(): void {
    this.consultaxNombreCuentaBancariaForm = this.fb.group({
      nombrecuentabancaria: [null, [
        Validators.required,
        Validators.pattern('[0-9]{16}')
      ]]
    });
  }

  public onSubmitConsultaPorCuentaBancaria(numeroCuenta: string): void {
    this.numeroCuentaBancaria = numeroCuenta;
    this.consultaListaMovimientosXNumeroCuentaBancaria(numeroCuenta);
  }

  public consultaListaMovimientosXNumeroCuentaBancaria(numeroCuenta: string, page?: number, size?: number): void {
    this.movimientoService.listarMovimientosporNumeroCuentaBancaria(numeroCuenta, page, size).subscribe({
      next: (data: any) => {
        this.movimientos = data.content;

        this.totalPages = data.totalPages;

        if(this.totalPages > 0){
          this.paginationSize = [];
          for(var i = 1; i <= this.totalPages; i++){
            this.paginationSize.push(i);
          }
        }
        console.log(data);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

}
