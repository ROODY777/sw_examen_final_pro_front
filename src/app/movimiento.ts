import { CuentaBancaria } from "./cuenta-bancaria";
import { Usuario } from "./usuario";

export class Movimiento {
    id: number;
    monto: number;
    tipo: string;
    moneda: string;
    estado: string;
    fechaCreacion?: Date;
    cuentaBancariaUsuario: CuentaBancaria;
    cuentaUsuario?: Usuario;    
}
