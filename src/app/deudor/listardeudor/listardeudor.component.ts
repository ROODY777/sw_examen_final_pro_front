import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/AuthService.service';
import { FormBuilder } from '@angular/forms';
import { DeudorService } from '../registrardeudor/deudor.service';
import { Deudor } from '../Deudor';
import Swal from 'sweetalert2';

interface cargoEmpresaArr {
  idcargoempresadeudor: number;
  cargoEmpresa: string;
}

@Component({
  selector: 'app-listardeudor',
  templateUrl: './listardeudor.component.html',
  styleUrls: ['./listardeudor.component.css']
})
export class ListardeudorComponent implements OnInit{


  lsCargoEmpresa: cargoEmpresaArr[] = [
    {idcargoempresadeudor: 1, cargoEmpresa: 'Gerencia'},
    {idcargoempresadeudor: 2, cargoEmpresa: 'Administración y finanzas General'},
    {idcargoempresadeudor: 3, cargoEmpresa: 'Administración y finanzas Contabilidad'},
    {idcargoempresadeudor: 4, cargoEmpresa: 'Administración y finanzas Tesoreria y pago a proveedores'},
    {idcargoempresadeudor: 5, cargoEmpresa: 'Responsable de compras'},
  ];

  //private cliente: CuentaBancariaRudy = new CuentaBancariaRudy();

  deudor: Deudor[] = [];
  errores: string[];




  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private deudorService: DeudorService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) { }





  ngOnInit(): void {
    debugger;

    // ROODY COMENTE
        this.deudorService.getTodosDeudor()
         .subscribe(
           response => this.deudor = response
         );
    
   // this.CuentaBancariaListaXIdCuentaUsuario();

  }






  delete(cliente: Deudor): void {

    Swal.fire({
      title: `¿Esta seguro de eliminar deudor ${cliente.nombre} ?`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No ,cancelar',
      showCancelButton: true,
         }).then((result) => {
      
        if (result.value) {

          this.deudorService.delete(cliente.id).subscribe(
            response => {
              this.deudor = this.deudor.filter(cli => cli !== cliente)
              Swal.fire(
                'Deudor eliminado!',
                'Deudor eliminado con exito',
                'success'
              )
            }
          )
        }
      })
  }










}
