import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { FacturaService } from 'src/app/services/factura.service';
import { Subasta } from '../subasta';
import { SubastaService } from 'src/app/subasta.service';
import { ModalXmlComponent } from '../modal-xml/modal-xml.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'app-registrar-subasta',
  templateUrl: './registrar-subasta.component.html',
  styleUrls: ['./registrar-subasta.component.css']
})
export class RegistrarSubastaComponent implements OnInit{
  subasta: Subasta = new Subasta();

  facturas!: any[];
  deudor!: string;

  constructor(
    public dialog: MatDialog,
    private data: DataService,
    private subastaService: SubastaService,
    private facturaService: FacturaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.subasta.cuentaUsuario = this.authService.getCurrentUser()[0];
  }

  openModal() {
    this.dialog.open(ModalXmlComponent, {
      width: 'auto',
      height: 'auto',
    });

    this.dialog.afterAllClosed.subscribe(() => {
      this.facturas = this.data.getFacturaData();
      this.subasta.montototal = this.subasta.montopendiente = this.facturas.reduce(
        (monto, factura) => monto + +factura.monto,
        0
      );
      this.deudor = this.facturas[0].ruccliente;
      this.subasta.fechapago = this.facturas.reduce((fecha, { fechapago }) => {
        return !fecha || fechapago < fecha ? fechapago : fecha;
      }, null);
    });
  }

  registrarSubasta() {    
    this.subastaService.registrarSubasta(this.subasta).subscribe((result: Subasta) => {
      this.facturas = this.facturas.map(obj => ({
        ...obj,
        subasta: {id:result.id},
      }));
      this.facturaService.registrarFacturas(this.facturas).subscribe();
      Swal.fire({
        title: "Subasta",
        icon: 'success',
        text: 'La subasta se ha registrado con éxito',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if(result.isConfirmed){
          this.clear();         
        }
      });
    });
  }

  clear() {
    this.data.clearFactura();
    this.subasta = new Subasta();
    this.facturas = [];
    this.deudor = "Deudor pendiente";
  }
}