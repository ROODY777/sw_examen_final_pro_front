import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService.service';
import Swal from 'sweetalert2';
import { Deudor } from '../Deudor';
import { DeudorService } from './deudor.service';
import { CuentaBancariaRudy } from 'src/app/registrar-cuenta-bancaria/cuentabancariaRudy';
import { CargoEmpresaDeudor } from '../CargoEmpresaDeudor';

interface cargoEmpresaArr {
  idcargoempresadeudor: number;
  cargoEmpresa: string;
}

@Component({
  selector: 'app-registrardeudor',
  templateUrl: './registrardeudor.component.html',
  styleUrls: ['./registrardeudor.component.css']
})



export class RegistrardeudorComponent {

  deudor: Deudor = new Deudor();

  selectedValue: string;
  selectedCar: string;

  lstCargoEmpresaDeudor: CargoEmpresaDeudor[] = [];

/*   lsCargoEmpresa: cargoEmpresaArr[] = [
    {idcargoempresadeudor: 1, cargoEmpresa: 'Gerencia'},
    {idcargoempresadeudor: 2, cargoEmpresa: 'Administración y finanzas General'},
    {idcargoempresadeudor: 3, cargoEmpresa: 'Administración y finanzas Contabilidad'},
    {idcargoempresadeudor: 4, cargoEmpresa: 'Administración y finanzas Tesoreria y pago a proveedores'},
    {idcargoempresadeudor: 5, cargoEmpresa: 'Responsable de compras'},
  ];
 */



  errores: string[];


/*   private cliente: CuentaBancariaRudy = new CuentaBancariaRudy();

  public ban: banco = new banco();
  
  lsttipoCuentabancaria: TipoCuentabancaria[] = [];
  lstBanco: banco[] = [];
  lstMoneda: moneda[] = []; */


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private deudorService: DeudorService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) { }



  form: FormGroup;

  ngOnInit(): void {
    //debugger

    this.deudorService.getTipoCargoEMpresaDeudor().subscribe(cargoEmpresaDeudor => {
      this.lstCargoEmpresaDeudor = cargoEmpresaDeudor;
      
    });
    this.form = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required] }],
      apellidos: ['', { validators: [Validators.required] }],
      cargoempresa: ['', { validators: [Validators.required] }],
      correo: ['', { validators: [Validators.required] }],
      telefono: ['', { validators: [Validators.required] }]
      //cci: ['', { validators: [Validators.required, Validators.minLength(20), Validators.maxLength(20)] }],

    });

  }



  guardarCambios(): void {

    debugger

   /*  var usuario = this.authService.usuario ;
    console.log(usuario.nombres);
   
    const obj = {};

    var myObj = new Usuario();
    myObj.id =  this.authService.usuario  ? this.authService.usuario [0].id : null,
    myObj.nombres =  this.authService.usuario  ? this.authService.usuario [0].nombres : null 


  const cuentaUsuario = { ... usuario } ;
  

    this.cuentaBancaria.cuentaUsuario = myObj;

    console.log(this.cuentaBancaria);
    console.log(this.cuentabancariaService); */
    
    this.deudorService.create(this.deudor).subscribe(
      deudor => {
        
        console.log(deudor);
        Swal.fire('Nuevo Deudor', `El deudor  ha sido creado con éxito`, 'success');
        this.router.navigate(['/listar-deudor']);
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );

  }









  obtenerErrorCampoNombre() {
    var nombre = this.form.get('nombre');

    if (nombre.hasError('required')) {
      return 'El campo nombre es requerido';
    }

    if (nombre.hasError('minlength')) {
      return 'La longitud mínima es de 3 digitos'
    }


    return '';
  }

  obtenerErrorcampoApellidos() {
    var apellidos = this.form.get('apellidos');

    if (apellidos.hasError('required')) {
      return 'El campo apellidos es requerido';
    }
 /*    if (apellidos.hasError('minlength')) {
      return 'La longitud mínima es de 3 digitos'
    }
    if (apellidos.hasError('maxlength')) {
      return 'La longitud maxima es de 20 digitos'
    } */

    return '';
  }

   obtenerErrorcargoEmpresa() {
    var cargoempresa = this.form.get('cargoempresa');

    if (cargoempresa.hasError('required')) {
      return 'El campo cargo empresa es requerido';
    }

    return '';
  }
 
  obtenerErrorCampoCorreo() {
    var correo = this.form.get('correo');

    if (correo.hasError('required')) {
      return 'El campo correo es requerido';
    }

    return '';
  }

  obtenerErrorCampoTelefono() {
    var telefono = this.form.get('telefono');

    if (telefono.hasError('required')) {
      return 'El campo telefono es requerido';
    }

    return '';
  }


























}
