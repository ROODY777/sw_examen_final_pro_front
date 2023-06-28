import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';
import { monedapostgre } from '../monedapostgre';
import { monedaPostgreService } from '../monedapostgre.service';

@Component({
  selector: 'app-crearmonedaporstre',
  templateUrl: './crearmonedaporstre.component.html',
  styleUrls: ['./crearmonedaporstre.component.css']
})
export class CrearmonedaporstreComponent implements OnInit{




  moneda: monedapostgre = new monedapostgre();

  errores: string[];



  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private cuentabancariaService: monedaPostgreService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) { }



  form: FormGroup;

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      moneda: ['', { validators: [Validators.required] }],

    });

  }



  guardarCambios(): void {
    debugger

    this.cuentabancariaService.create(this.moneda).subscribe(
      cuentabancaria => {

        Swal.fire('Nueva Moneda', `la moneda ha sido creado con éxito`, 'success');
        this.router.navigate(['/listar-moneda-postgre']);
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );

    
  //this.guardarCambios2();
  }




  obtenerErrorBanco() {
    var moneda = this.form.get('moneda');

    if (moneda.hasError('required')) {
      return 'El campo MOneda es requerido';
    }

    return '';
  }






}
