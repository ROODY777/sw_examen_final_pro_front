import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ModalService } from 'src/app/cuentabancaria/modal.service';
import { AuthService } from '../../services/AuthService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { bancomongo } from '../bancomongo';
import { bancomongoService } from '../crearbancomongo/bancomongo.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-listarbancomongo',
  templateUrl: './listarbancomongo.component.html',
  styleUrls: ['./listarbancomongo.component.css']
})
export class ListarbancomongoComponent  implements OnInit {

  inversion: bancomongo[] = [];
  errores: string[];
  estado: string = "";

  cobranzangModel: string = "";


  @ViewChild('table')
  table: MatTable<any>;


  columnasAMostrar = ['nombre'];

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private bancoService: bancomongoService,
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

    this.bancoService.getTodosbancoMOngo()
      .subscribe(

          (x) => {
            //this.autores = x.lista;
            //alert(x.mensaje);
            this.dataSource = new MatTableDataSource<bancomongo>(x);
            this.dataSource.paginator = this.paginator;
            console.log( x);
          }
      );
  }










  delete(cliente: bancomongo): void {
debugger
    swal.fire({
      title: `¿Esta seguro de eliminar Banco con N° ${cliente.descripcion} ?`,
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
                'Banco eliminado!',
                'Banco  con exito',
                'success'
              )
            }
          )
        }
      })
  }





  private refreshTable() {
    this.bancoService.getTodosbancoMOngo()
      .subscribe(

          (x) => {
            //this.autores = x.lista;
            //alert(x.mensaje);
            this.dataSource = new MatTableDataSource<bancomongo>(x);
            this.dataSource.paginator = this.paginator;
            console.log( x);
          }
      );

}


}