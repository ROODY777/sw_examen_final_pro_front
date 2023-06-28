import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeudorService } from '../registrardeudor/deudor.service';
import Swal from 'sweetalert2';
import { Deudor } from '../Deudor';
import { CargoEmpresaDeudor } from '../CargoEmpresaDeudor';

@Component({
  selector: 'app-actualizardeudor',
  templateUrl: './actualizardeudor.component.html',
  styleUrls: ['./actualizardeudor.component.css']
})
export class ActualizardeudorComponent implements OnInit{

  deudor: Deudor = new Deudor();
  errores: string[];
  lstCargoEmpresaDeudor: CargoEmpresaDeudor[] = [];


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private deudorService: DeudorService,
    private activateRoute: ActivatedRoute,
  ) { }


  form: FormGroup;

  ngOnInit(): void {
    
    this.cargarDeudor();

    this.deudorService.getTipoCargoEMpresaDeudor().subscribe(cargoEmpresaDeudor => this.lstCargoEmpresaDeudor = cargoEmpresaDeudor);

    this.form = this.formBuilder.group({
      nombre: ['', { validators: [Validators.required] }],
      apellidos: ['', { validators: [Validators.required] }],
      cargoempresa: ['', { validators: [Validators.required] }],
      correo: ['', { validators: [Validators.required] }],
      telefono: ['', { validators: [Validators.required] }]

    });
   
  }



  update(): void {
    console.log(this.deudor);
    debugger
    this.deudorService.update(this.deudor)
      .subscribe(
        json => {
          Swal.fire('Deudor actualizado', ` ${json.mensaje}  ID : ${this.deudor.id}`, 'success');
          this.router.navigate(['/listar-deudor'])
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }



  cargarDeudor(): void {
    debugger
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.deudorService.getDeudor(id).subscribe((cliente) => this.deudor = cliente)
      }
    })
  }




  compararCargoEmpresaDeudor(o1: CargoEmpresaDeudor, o2: CargoEmpresaDeudor): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null ||
      o1 == undefined || o2 == undefined
      ? false : o1.idcargoempresadeudor === o2.idcargoempresadeudor;

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
