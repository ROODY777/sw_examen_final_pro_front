import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../factura';

@Injectable({
    providedIn: 'root'
})
export class FacturaService {

    private URL = "http://localhost:8081/factura";

    constructor(private http: HttpClient) { }

    /*registrar(idempresa: number, factura: Object): Observable<Object>{
        return this.http.post(this.URL + "/empresa/" + idempresa + "/factura", factura);
    }*/

    registrarFacturas(facturas: Factura[]):Observable<Object>{
        return this.http.post(`${this.URL}/registro`, facturas);
    }
}
