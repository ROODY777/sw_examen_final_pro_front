import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/AuthService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { bancomongoService } from './bancomongo.service';
import { CuentaBancariaRudy } from '../../registrar-cuenta-bancaria/cuentabancariaRudy';
import { bancomongo } from '../bancomongo';

@Component({
  selector: 'app-crearbancomongo',
  templateUrl: './crearbancomongo.component.html',
  styleUrls: ['./crearbancomongo.component.css']
})
export class CrearbancomongoComponent implements OnInit {

  private cliente: CuentaBancariaRudy = new CuentaBancariaRudy();

  banco: bancomongo = new bancomongo();

  errores: string[];



  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private cuentabancariaService: bancomongoService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) { }



  form: FormGroup;

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      banco: ['', { validators: [Validators.required] }],

    });

  }



  guardarCambios(): void {
    debugger

    this.cuentabancariaService.create(this.banco).subscribe(
      cuentabancaria => {

        Swal.fire('Nuevo Banco', `El banco  ha sido creado con éxito`, 'success');
        this.router.navigate(['/listar-banco-mongo']);
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );

    
  //this.guardarCambios2();
  }




  guardarCambios2(): void {
    debugger

    this.cuentabancariaService.createPostgre(this.banco).subscribe(
      cuentabancaria => {

        Swal.fire('Nuevo Banco', `El banco  ha sido creado con éxito`, 'success');
        this.router.navigate(['/listar-banco-mongo']);
        // this.router.navigate(['/listar-cuenta-bancaria']);
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }












  obtenerErrorBanco() {
    var banco = this.form.get('banco');

    if (banco.hasError('required')) {
      return 'El campo Banco es requerido';
    }

    return '';
  }


}
