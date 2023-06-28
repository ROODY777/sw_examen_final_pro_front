import { banco } from "./banco";
import { moneda } from "./moneda";
import { TipoCuentabancaria } from './tipoCuentabancaria';
import { Usuario } from 'src/app/usuario';
import { bancomongo } from '../bancomongo/bancomongo';

export class CuentaBancariaRudy {
  id: number;
  // idcuentausuario?: string;
  cuentaUsuario: Usuario;
 // cuentaUsuario: number;
  banco?: string;
  //banco?: bancomongo;
  tipoCuentaBancaria: TipoCuentabancaria;
  moneda: string;
  numerocuenta: string;
  cci: string;
  archivo?: string;

}
//ro
