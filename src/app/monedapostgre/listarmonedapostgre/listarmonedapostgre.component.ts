import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/AuthService.service';
import { ModalService } from '../../cuentabancaria/modal.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { monedapostgre } from '../monedapostgre';
import { monedaPostgreService } from '../monedapostgre.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listarmonedapostgre',
  templateUrl: './listarmonedapostgre.component.html',
  styleUrls: ['./listarmonedapostgre.component.css']
})
export class ListarmonedapostgreComponent  implements OnInit {

  inversion: monedapostgre[] = [];
  errores: string[];
  estado: string = "";

  cobranzangModel: string = "";


  @ViewChild('table')
  table: MatTable<any>;


  columnasAMostrar = ['nombre'];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private bancoService: monedaPostgreService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private modalService: ModalService
  ) { }



  displayedColumns = ["id","descripcion", 'acciones'];
   //Grila
   dataSource:any;
   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit(): void {

    this.bancoListar();

  }
 

  bancoListar(): void {

    this.bancoService.getTodosMoneda()
      .subscribe(

          (x) => {
            //this.autores = x.lista;
            //alert(x.mensaje);
            this.dataSource = new MatTableDataSource<monedapostgre>(x);
            this.dataSource.paginator = this.paginator;
            console.log( x);
          }
      );
  }










  delete(cliente: monedapostgre): void {
debugger
    swal.fire({
      title: `¿Esta seguro de eliminar Moneda  ${cliente.descripcion} ?`,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No ,cancelar',
      showCancelButton: true,

 }).then((result) => {
        //debugger
        if (result.value) {

          this.bancoService.delete(cliente.id).subscribe(
            response => {
              this.refreshTable();
              this.inversion = this.inversion.filter(cli => cli !== cliente)
              swal.fire(
                'Moneda eliminado!',
                'Moneda  con exito',
                'success'
              )
            }
          )
        }
      })
  }





  private refreshTable() {
    this.bancoService.getTodosMoneda()
      .subscribe(

          (x) => {
            //this.autores = x.lista;
            //alert(x.mensaje);
            this.dataSource = new MatTableDataSource<monedapostgre>(x);
            this.dataSource.paginator = this.paginator;
            console.log( x);
          }
      );

}














}
