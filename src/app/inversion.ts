import { Subasta } from "./subasta/subasta";
import { Usuario } from "./usuario";

export class Inversion {
    id?: number;
    fecha?: Date;
    monto: number;
    porcentaje: number;
    ganancia: number;
    retornomensual: number;
    estado: string;
    cuentaUsuario: Usuario;
    subasta: Subasta
}
