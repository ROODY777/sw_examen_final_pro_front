import { Component } from '@angular/core';
import { bancomongo } from '../bancomongo';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { bancomongoService } from '../crearbancomongo/bancomongo.service';
import { AuthService } from '../../services/AuthService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizabancomongo',
  templateUrl: './actualizabancomongo.component.html',
  styleUrls: ['./actualizabancomongo.component.css']
})
export class ActualizabancomongoComponent {







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
    this.cargarCuentaBancaria();
    this.form = this.formBuilder.group({
      banco: ['', { validators: [Validators.required] }],

    });

  }

  cargarCuentaBancaria(): void {
    debugger
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.cuentabancariaService.getBancoid(id).subscribe((cliente) => this.banco = cliente)
      }
    })
  }


  update(): void {
    debugger
    console.log(this.banco);
    this.cuentabancariaService.update(this.banco)
      .subscribe(
        json => {
         Swal.fire('Banco actualizado', ` ID : ${this.banco.id}`, 'success');
         // Swal.fire('Actualizar Banco', `El banco  ha sido actualizado con éxito`, 'success');
          this.router.navigate(['/listar-banco-mongo'])
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
