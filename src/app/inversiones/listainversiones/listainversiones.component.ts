import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Inversion } from '../../inversion';
import { Usuario } from '../../usuario';
import { ModalService } from '../../cuentabancaria/modal.service';
import { AuthService } from '../../services/AuthService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InversionService } from '../../inversion.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-listainversiones',
  templateUrl: './listainversiones.component.html',
  styleUrls: ['./listainversiones.component.css']
})
export class ListainversionesComponent implements OnInit {
  inversion: Inversion[] = [];
  errores: string[];
  estado: string = "";

  cobranzangModel: string = "";


  @ViewChild('table')
  table: MatTable<any>;


  columnasAMostrar = ['nombre'];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private inversionService: InversionService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private modalService: ModalService
  ) { }



  displayedColumns = ["id","monto","ganancia","retornomensual","estado","fecha","cuentaUsuario","idsubasta"];
   //Grila
   dataSource:any;
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {
    debugger;

    this.inversionesListaXIdCuentaUsuarioll();

  }




  inversionesListaXIdCuentaUsuarioll(): void {

    var usuario = this.authService.usuario;
    console.log(usuario.nombres);

    var myObj = new Usuario();
    myObj.id = this.authService.usuario ? this.authService.usuario[0].id : null,
      myObj.nombres = this.authService.usuario ? this.authService.usuario[0].nombres : null
    var id = myObj.id
    // this.cuentaBancaria = myObj;
    this.inversionService.inversionesListaXIdCuentaUsuario(id)
      .subscribe(
       // response => this.inversion = response

       /*  (x) => {
          //this.autores = x.lista;
          //alert(x.mensaje);
          this.dataSource = new MatTableDataSource<Inversion>(x);} */

    /*      { response => this.dataSource = response;
          this.dataSource.paginator = this.paginator;}

 */


          (x) => {
            //this.autores = x.lista;
            //alert(x.mensaje);
            this.dataSource = new MatTableDataSource<Inversion>(x);
            this.dataSource.paginator = this.paginator;;
          }
      );
  }






  inversionesListaXIdCuentaUsuarioaa(value): void {
    debugger
    var idss = (event.target as HTMLInputElement).value
    console.log(" Valddddue is : ", value );
    console.log(" Value is : ", idss );


    var usuario = this.authService.usuario;
    console.log(usuario.nombres);

    var myObj = new Usuario();
    myObj.id = this.authService.usuario ? this.authService.usuario[0].id : null,
      myObj.nombres = this.authService.usuario ? this.authService.usuario[0].nombres : null
    var id = myObj.id
    // this.cuentaBancaria = myObj;
    this.inversionService.inversionesListaXIdCuentaUsuarioYXEstado(id,idss)
      .subscribe(


          (x) => {
            //this.autores = x.lista;
            //alert(x.mensaje);
            this.dataSource = new MatTableDataSource<Inversion>(x.lista);
            this.dataSource.paginator = this.paginator;;
          }
      );
  }












}
