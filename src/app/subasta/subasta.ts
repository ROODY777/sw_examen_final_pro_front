import { Factura } from '../factura';
import { Usuario } from '../usuario';
import { Inversion } from '../inversion';
export class Subasta {
   id: number;
   deudorempresa: string;
   riesgo: string;
   fechapago: Date;
   fechaemision: Date;
   moneda: string;
   montototal: number;
   montopendiente: number;
   tiposubasta: string;
   retorno: number;
   facturas: Array<Factura>=[];
   cuentaUsuario: Usuario;
   inversiones: Array<Inversion>=[];
}