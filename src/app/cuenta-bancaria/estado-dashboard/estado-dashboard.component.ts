import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estado-dashboard',
  templateUrl: './estado-dashboard.component.html',
  styleUrls: ['./estado-dashboard.component.css']
})
export class EstadoDashboardComponent {

  constructor(public router:Router){

  }

  clickCuentaBancaria(){
    this.router.navigate(['estado-dashboard/estado-cuenta-bancaria']);

  }
}
