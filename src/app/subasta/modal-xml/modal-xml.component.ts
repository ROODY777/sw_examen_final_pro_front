import { Component } from '@angular/core';
import * as xml2js from 'xml2js';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { RegistrafacturaComponent } from 'src/app/factura/registrafactura/registrafactura.component';

@Component({
  selector: 'app-modal-xml',
  templateUrl: './modal-xml.component.html',
  styleUrls: ['./modal-xml.component.css']
})
export class ModalXmlComponent {
  archivoSeleccionado!: File | null;

  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<RegistrafacturaComponent>, private data: DataService){}

  onArchivoSeleccionado(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  cargarArchivo(event: Event) {
    event.preventDefault();
    if (this.archivoSeleccionado) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const xmlString = fileReader.result as string;
        const parser = new xml2js.Parser({explicitArray: false, tagNameProcessors: [xml2js.processors.stripPrefix]});
        parser.parseString(xmlString, (err: any, result: any) => {
          if (err) {
            console.error('Error al analizar el archivo XML:', err);
          } else {
            console.log(result);
            const data = {
              rucdeudor: result.Invoice.AccountingCustomerParty.CustomerAssignedAccountID,
              razondeudor: result.Invoice.AccountingCustomerParty.Party.PartyLegalEntity.RegistrationName,
              monto: result.Invoice.LegalMonetaryTotal.PayableAmount._,
              numfactura: result.Invoice.ID,
              fechaemision: result.Invoice.IssueDate
            };
            this.data.setXmlData(data);
            this.dialogRef.close();
            this.dialog.open(RegistrafacturaComponent, {
              width: '40%',
              height: 'auto'
            });
          }
        });
      };
      fileReader.readAsText(this.archivoSeleccionado);
    }
  }
}
