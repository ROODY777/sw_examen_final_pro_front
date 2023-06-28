import { Component, Input, OnInit } from '@angular/core';
import { CuentaBancariaRudy } from '../../registrar-cuenta-bancaria/cuentabancariaRudy';

@Component({
  selector: 'cuenta-bancaria-card',
  templateUrl: './cuenta-bancaria-card.component.html',
  styleUrls: ['./cuenta-bancaria-card.component.css']
})
export class CuentaBancariaCardComponent implements OnInit {



@Input()
public cuenta!: CuentaBancariaRudy;

ngOnInit(): void {
 if(!this.cuenta)
 throw Error('Cuenta bancaria no existe');
}


















}
