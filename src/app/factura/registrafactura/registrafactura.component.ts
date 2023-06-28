import { FormBuilder, FormGroup } from '@angular/forms';
import { FacturaService } from './../../services/factura.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-registrafactura',
    templateUrl: './registrafactura.component.html',
    styleUrls: ['./registrafactura.component.css']
})
export class RegistrafacturaComponent implements OnInit {
    xmlData!: any;

  rucdeudor!: string;
  razondeudor!: string;
  monto!: number;
  numfactura!: string;
  fechaemision!: string;

  tipofactura!: string;
  fechapago!: Date;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<RegistrafacturaComponent>,
    private data: DataService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.xmlData = this.data.getXmlData();
    this.rucdeudor = this.xmlData.rucdeudor;
    this.razondeudor = this.xmlData.razondeudor;
    this.monto = this.xmlData.monto;
    this.numfactura = this.xmlData.numfactura;
    this.fechaemision = this.xmlData.fechaemision;
  }

  registrarFactura() {
    const data = {
      ruccliente: this.rucdeudor,
      razonsocialcliente: this.razondeudor,
      monto: this.monto,
      numfactura: this.numfactura,
      fechaemision: this.fechaemision,
      tipo: this.tipofactura,
      fechapago: this.datePipe.transform(this.fechapago, 'yyyy-MM-dd'),
      subasta:"",
      // cuentausuario:""
    };

    this.data.setFacturaData(data);
    this.dialogRef.close();
  }
}
