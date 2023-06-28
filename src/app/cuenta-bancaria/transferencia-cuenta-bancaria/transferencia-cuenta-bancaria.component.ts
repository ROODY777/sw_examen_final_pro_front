import { Component, OnInit } from '@angular/core';
import { Cartera } from 'src/app/cartera';
import { CarteraService } from 'src/app/cartera.service';
import { Usuario } from 'src/app/usuario';

@Component({
  selector: 'app-transferencia-cuenta-bancaria',
  templateUrl: './transferencia-cuenta-bancaria.component.html',
  styleUrls: ['./transferencia-cuenta-bancaria.component.css']
})
export class TransferenciaCuentaBancariaComponent implements OnInit{

  cartera: Cartera[];
  usuario: Usuario = new Usuario();
  montoUSD: number;
  montoPEN: number;
  

  constructor(private carteraService: CarteraService){}

  ngOnInit(): void {
    const usuarioLogged = localStorage.getItem("currentUser");
    this.usuario = JSON.parse(usuarioLogged)[0];
    this.carteraService.listarCarteras(this.usuario.id).subscribe((result: any) =>{
      this.cartera = result;
      for(let item of result){
        if (item.moneda.descripcion === 'USD')  this.montoUSD = item.cantidad;
        else if (item.moneda.descripcion === 'PEN') this.montoPEN = item.cantidad;
      }
    });

  }


}
