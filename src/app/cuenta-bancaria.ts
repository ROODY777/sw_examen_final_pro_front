import { Banco } from "./banco";
import { Moneda } from "./moneda";

export class CuentaBancaria {
    id: number;
    numerocuenta: string;
    cci: string;
    archivo: string;
    banco: Banco;
    tipoCuentaBancaria: string;
    descripcion: string;
    moneda: Moneda;
}