import { Subasta } from './subasta/subasta';
export class Factura {
    id: number;

    fechaemision!: Date;
    fechapago!: Date;
    monto!: number;
    ruccliente!: string;
    razonsocialcliente!: string;


    subasta:Subasta;
}
