import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoCuentabancaria } from './tipoCuentabancaria';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaBancariaService } from './cuentabancaria.service';
import { banco } from './banco';
import { moneda } from './moneda';
import Swal from 'sweetalert2';
import { CuentaBancariaRudy } from './cuentabancariaRudy';
import { AuthService } from '../services/AuthService.service';
import { Usuario } from '../usuario';
import { TipoPerfilUsuario } from '../tipoperfilusuario';
import { bancomongoService } from '../bancomongo/crearbancomongo/bancomongo.service';
import { bancomongo } from '../bancomongo/bancomongo';
import { monedaPostgreService } from '../monedapostgre/monedapostgre.service';
import { monedapostgre } from '../monedapostgre/monedapostgre';

@Component({
  selector: 'app-registrar-cuenta-bancaria',
  templateUrl: './registrar-cuenta-bancaria.component.html',
  styleUrls: ['./registrar-cuenta-bancaria.component.css']
})
export class RegistrarCuentaBancariaComponent implements OnInit {

  private cliente: CuentaBancariaRudy = new CuentaBancariaRudy();

  cuentaBancaria: CuentaBancariaRudy = new CuentaBancariaRudy();
  public ban: banco = new banco();
  errores: string[];
  lsttipoCuentabancaria: TipoCuentabancaria[] = [];
  lstBanco: banco[] = [];
  lstMoneda: moneda[] = [];

  bancomongo: bancomongo[] = [];
  monedaPostgre: monedapostgre[] = [];


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private cuentabancariaService: CuentaBancariaService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private bancomongoService: bancomongoService,
    private monedaService: monedaPostgreService,
  ) { }



  form: FormGroup;

  ngOnInit(): void {
    //debugger
    this.cargarCuentaBancaria();

    //comente roody 25/*5/2023
    /*this.cuentabancariaService.getTipoBanco().subscribe(bancos => {
      this.lstBanco = bancos;
      console.log(bancos);
    });*/

    this.bancomongoService.getTodosbancoMOngo().subscribe(moneda => {this.bancomongo = moneda; console.log(moneda);});
    this.monedaService.getTodosMoneda().subscribe(moneda => {this.monedaPostgre = moneda; console.log(moneda);});



    this.cuentabancariaService.getTipoMoneda().subscribe(moneda => this.lstMoneda = moneda);
    this.cuentabancariaService.getTipoCuentabancaria().subscribe(tipoCuentaBancaria => this.lsttipoCuentabancaria = tipoCuentaBancaria);
    this.form = this.formBuilder.group({
      banco: ['', { validators: [Validators.required] }],
      numerocuenta: ['', { validators: [Validators.required,Validators.minLength(13) ] }],
      tipoCuentaBancaria: ['', { validators: [Validators.required] }],
      moneda: ['', { validators: [Validators.required] }],
      cci: ['', { validators: [Validators.required ,Validators.minLength(20),Validators.maxLength(20)] }],
      //idcuentausuario: ['']
      //,archivo: ['']
    });
    //debugger

    
  }

  compararRegion(o1: banco, o2: banco): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null ||
      o1 == undefined || o2 == undefined
      ? false : o1._id=== o2._id;

  }

  /*  guardarCambios() {
     // ... guardar los cambios
     this.router.navigate(['/generos']);
   } */

  guardarCambios(): void {

    //Roody
    //debugger

    //var username = JSON.parse(this.authService.usuario);
    //localStorage.setItem('usuario', JSON.stringify(this._usuario))
    
    /* var arry = this.authService.usuario  ? this.authService.usuario [0].id : null;
    var temp2 = this.authService.usuario  ? this.authService.usuario [0].nombres : null; */
    //var f = JSON.parse(username) as Usuario;

    var usuario = this.authService.usuario ;
    console.log(usuario.nombres);
   
    const obj = {};

    var myObj = new Usuario();
    myObj.id =  this.authService.usuario  ? this.authService.usuario [0].id : null,
    myObj.nombres =  this.authService.usuario  ? this.authService.usuario [0].nombres : null 

    const producto = {
     // nombres: usuario.nombres,
      nombres: this.authService.usuario  ? this.authService.usuario [0].id : null,
      id: this.authService.usuario  ? this.authService.usuario [0].nombres : null 
      
    }

console.log(producto);
    //usuario.forEach(element => console.log(element));

    //console.log(id);
//const object = Object.assign({}, usuario)
  const cuentaUsuario = { ... usuario } ;
  //debugger

  //delete objeto.TipoCuentabancaria;
  //objeto.
  // objeto.TipoPerfilUsuario.pop();
//const toObject= Object.fromEntries(usuario);
  //  this.cuentaBancaria.cuentaUsuario = cuentaUsuario.id;
    this.cuentaBancaria.cuentaUsuario = myObj;
    //this.cuentaBancaria.cuentaUsuario = objeto.id as Usuario;
   


    console.log(this.cuentaBancaria);
    console.log(this.cuentabancariaService);
    debugger
    this.cuentabancariaService.create(this.cuentaBancaria).subscribe(
      cuentabancaria => {
        debugger
        console.log(cuentabancaria);
        Swal.fire('Nueva Cuenta bancaria', `La cuenta bancaria  ha sido creado con éxito`, 'success');
       // this.router.navigate(['/listar-cuenta-bancaria']);
        this.router.navigate(['/estado-dashboard/estado-cuenta-bancaria']);
       
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }



  update(): void {
    console.log(this.cliente);
    this.cuentabancariaService.update(this.cliente)
      .subscribe(
        json => {
          Swal.fire('Cuenta bancaria actualizado', ` ${json.mensaje} : ${json.cliente.nombre}`, 'success');
          this.router.navigate(['/listar-cuenta-bancaria'])
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }





  cargarCuentaBancaria(): void {
   // debugger
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.cuentabancariaService.getCuentaBancaria(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }













  obtenerErrorCampoNombre() {
    var numerocuenta = this.form.get('numerocuenta');
    var cci = this.form.get('cci');

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
    /*  debugger
   
     if (idmoneda.value == "0"){
       return 'El campo Tipo Moneda es '; 
     }
    */

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
//roody