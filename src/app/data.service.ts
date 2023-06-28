import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private xmlData: any;
  factura: any[] = [];
  
  constructor() { }

  setXmlData(data: any){
    this.xmlData = data;
  }

  getXmlData(){
    return this.xmlData;
  }

  setFacturaData(data: any){
    this.factura.push(data);
    console.table(this.factura);
  }

  getFacturaData(){
    return this.factura;
  }

  clearFactura(){
    this.factura = [];
  }

}
