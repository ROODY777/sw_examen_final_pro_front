import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';
import { monedapostgre } from '../monedapostgre';
import { monedaPostgreService } from '../monedapostgre.service';

@Component({
  selector: 'app-actualizapostgre',
  templateUrl: './actualizapostgre.component.html',
  styleUrls: ['./actualizapostgre.component.css']
})
export class ActualizapostgreComponent {




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
    this.cargarCuentaBancaria();
    this.form = this.formBuilder.group({
      moneda: ['', { validators: [Validators.required] }],

    });

  }

  cargarCuentaBancaria(): void {
    debugger
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.cuentabancariaService.getBancoid(id).subscribe((cliente) => this.moneda = cliente)
      }
    })
  }


  update(): void {
    debugger
    console.log(this.moneda);
    this.cuentabancariaService.update(this.moneda)
      .subscribe(
        json => {
         Swal.fire('Moneda actualizado', ` ID : ${this.moneda.id}`, 'success');
         // Swal.fire('Actualizar Banco', `El banco  ha sido actualizado con éxito`, 'success');
          this.router.navigate(['/listar-moneda-postgre'])
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      ); 
  }







  obtenerErrorBanco() {
    var moneda = this.form.get('moneda');

    if (moneda.hasError('required')) {
      return 'El campo Banco es requerido';
    }

    return '';
  }


































}
