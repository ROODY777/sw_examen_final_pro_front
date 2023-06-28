import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CuentaBancariaRudy } from 'src/app/registrar-cuenta-bancaria/cuentabancariaRudy';
import { banco } from 'src/app/registrar-cuenta-bancaria/banco';
import { moneda } from 'src/app/registrar-cuenta-bancaria/moneda';
import { TipoCuentabancaria } from '../../registrar-cuenta-bancaria/tipoCuentabancaria';
import { Router, ActivatedRoute } from '@angular/router';
import { CuentaBancariaService } from '../../registrar-cuenta-bancaria/cuentabancaria.service';

@Component({
  selector: 'app-actualizar-cuenta-bancaria',
  templateUrl: './actualizar-cuenta-bancaria.component.html',
  styleUrls: ['./actualizar-cuenta-bancaria.component.css']
})
export class ActualizarCuentaBancariaComponent implements OnInit{






  private cliente: CuentaBancariaRudy = new CuentaBancariaRudy();

  cuentaBancaria: CuentaBancariaRudy = new CuentaBancariaRudy();

  public ban: banco = new banco();
  errores: string[];
  lsttipoCuentabancaria: TipoCuentabancaria[] = [];
  lstBanco: banco[] = [];
  lstMoneda: moneda[] = [];


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private cuentabancariaService: CuentaBancariaService,
    private activateRoute: ActivatedRoute,
  ) { }



  form: FormGroup;

  ngOnInit(): void {
    //debugger
    this.cargarCuentaBancaria();
    this.cuentabancariaService.getTipoBanco().subscribe(bancos => {
      this.lstBanco = bancos;
      console.log(bancos);
    });
    this.cuentabancariaService.getTipoMoneda().subscribe(moneda => this.lstMoneda = moneda);
    this.cuentabancariaService.getTipoCuentabancaria().subscribe(tipoCuentaBancaria => this.lsttipoCuentabancaria = tipoCuentaBancaria);
    this.form = this.formBuilder.group({
      banco: ['', { validators: [Validators.required] }],
      numerocuenta: ['', { validators: [Validators.required,Validators.minLength(13)] }],
      tipoCuentaBancaria: ['', { validators: [Validators.required] }],
      moneda: ['', { validators: [Validators.required] }],
      cci: ['', { validators: [Validators.required,Validators.minLength(20),Validators.maxLength(20)] }],
      //idcuentausuario: ['']
      //,archivo: ['']
    });
    //debugger

    
  }

  compararBanco(o1: banco, o2: banco): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null ||
      o1 == undefined || o2 == undefined
      ? false : o1._id === o2._id;

  }
  comparartipoCuentaBancaria(o1: TipoCuentabancaria, o2: TipoCuentabancaria): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null ||
      o1 == undefined || o2 == undefined
      ? false : o1.id === o2.id;

  }
  compararMoneda(o1: moneda, o2: moneda): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null ||
      o1 == undefined || o2 == undefined
      ? false : o1.id === o2.id;

  }




  update(): void {
    console.log(this.cuentaBancaria);
    debugger
    this.cuentabancariaService.update(this.cuentaBancaria)
      .subscribe(
        json => {
          Swal.fire('Cuenta bancaria actualizado', ` ${json.mensaje}  ID : ${this.cuentaBancaria.id}`, 'success');
          this.router.navigate(['/estado-dashboard/estado-cuenta-bancaria'])
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }





  cargarCuentaBancaria(): void {
    debugger
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.cuentabancariaService.getCuentaBancaria(id).subscribe((cliente) => this.cuentaBancaria = cliente)
      }
    })
  }







  obtenerErrorCampoNombre() {
    var numerocuenta = this.form.get('numerocuenta');

    if (numerocuenta.hasError('required')) {
      return 'El campo Número de cuenta es requerido';
    }
    if (numerocuenta.hasError('minlength')){
      return 'La longitud mínima es de 13 digitos'
    }


    return '';
  }

  obtenerErrorCampoCci() {
    var cci = this.form.get('cci');

    if (cci.hasError('required')) {
      return 'El campo CCI es requerido';
    }
    if (cci.hasError('minlength')){
      return 'La longitud mínima es de 20 digitos'
    }
    if (cci.hasError('maxlength')){
      return 'La longitud maxima es de 20 digitos'
    }
    return '';
  }

  obtenerErrorCampoMoneda() {
    var idmoneda = this.form.get('moneda');

    if (idmoneda.hasError('required')) {
      return 'El campo Tipo Moneda es requerido';
    }

    return '';
  }

  obtenerErrorCampoBanco() {
    var idbanco = this.form.get('banco');

    if (idbanco.hasError('required')) {
      return 'El campo Tipo Banco es requerido';
    }

    return '';
  }

  obtenerErrorCampoTipoCuentaBancaria() {
    var idcuentabancaria = this.form.get('tipoCuentaBancaria');

    if (idcuentabancaria.hasError('required')) {
      return 'El campo tipo Cuenta Bancaria es requerido';
    }

    return '';
  }


}
