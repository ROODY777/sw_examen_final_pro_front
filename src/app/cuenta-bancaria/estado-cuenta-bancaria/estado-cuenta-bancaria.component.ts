import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

// @Component({
//   selector: 'app-estado-cuenta-bancaria',
//   templateUrl: './estado-cuenta-bancaria.component.html',
//   styleUrls: ['./estado-cuenta-bancaria.component.css']
// })
// export class EstadoCuentaBancariaComponent  {

//   // private constructor(private router:Router){

//   // }

//   clickAgregarCuentaBancaria(){
//     console.log("A");
//   }

//   // ngOnInit(): void {
//   // }

// }


@Component({
  selector: 'app-estado-cuenta-bancaria',
  templateUrl: './estado-cuenta-bancaria.component.html',
  styleUrls: ['./estado-cuenta-bancaria.component.css']
})
export class EstadoCuentaBancariaComponent implements OnInit{

  public constructor(private router:Router){
  
  
  }

  clickAgregarCuentaBancaria(){
        this.router.navigate(['estado-dashboard/estado-cuenta-bancaria/registrar-cuenta-bancaria']);
      }

      
    ngOnInit(): void {
    }
  }