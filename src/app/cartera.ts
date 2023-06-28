import { Moneda } from "./moneda";
import { Usuario } from "./usuario";

export class Cartera {
    id: number;
    cuentaUsuario: Usuario;
    moneda: Moneda;
    cantidad: number;
}
