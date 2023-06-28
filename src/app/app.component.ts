
import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/AuthService.service';
import { CuentaBancariaService } from './cuenta-bancaria.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  

  title = 'factoring-frontend';
  imageSrcLogo = 'assets/imagenes/logo.png';
  usuario: Usuario = new Usuario();
  mostrarContenido = true;
  authService: AuthService; // <-- Agregue esta propiedad
  rutaActual: string;
  tipoUsuario="";
  inversion_bol:boolean=false;
  id_:string="";

  constructor(private auth: AuthService,private router:Router){
    // const currentUrl = this.location.href;
    // console.log(currentUrl);
    // console.log(this.id_);
    this.authService=auth;
    // Suscribirse al observable currentUser del servicio de AuthService
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.tipoUsuario = user[0].tiposPerfilesUsuario[0].nombre;
        this.usuario = user[0];
      } else {
        this.tipoUsuario = '';
        this.usuario = null;
      }
    });

    this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            const url = event.urlAfterRedirects;
            console.log(url.toString());
            const ultimo_numero = url.toString().split("/")[4];
            // console.log(ultimo_numero[4])
            this.mostrarContenido = !['/login', '/registro'].includes(url);
            

            
            if(this.usuario!=null){
              if(url==`/micuenta/personal/${this.usuario.id}`){
                this.cuentaUsuario=true;
                // if(this.tipoUsuario=="Inversionista"){
                //   this.inversion_bol=true;
                // }
                this.value0=false;
                this.value1=true;
                this.cuentaUsuario=true;
                this.rutaActual = "Mi Cuenta Personal"
                this.router.navigate([`/micuenta/personal/${this.usuario.id}`]);
                const micuenta=document.querySelector("#micuenta");
                const inicio=document.querySelector("#inicio");
                if(inicio!=null){
                  inicio.classList.remove("inicio");
                }
      
                if(micuenta != null){
                  micuenta.classList.add("micuenta");
      
                  const inicio=document.querySelector("#inicio");
                  if(inicio!=null){
                    inicio.classList.remove("inicio");
                  }
      
                  const inversiones=document.querySelector("#inversiones");
                  if(inversiones!=null){
                    inversiones.classList.remove("inversiones");
              
                  }
        
                  const estadoCuenta=document.querySelector("#estadoCuenta");
                  if(estadoCuenta!=null){
                    estadoCuenta.classList.remove("estadoCuenta");
                  }
                  
                  const subasta=document.querySelector("#subasta");
                  if(subasta!=null){
                    subasta.classList.remove("subasta");
                  }
                }
      
              }else if(url=="/inversionista/dashboard"){
                this.cuentaUsuario=false;
                const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
                this.value0=true;
                this.value1=false;
                this.rutaActual = "Inicio";
                this.router.navigate([`/${this.tipoUsuario.toLowerCase()}/dashboard`]);
                const inicio=document.querySelector("#inicio");
      
                
      
                if(inicio !=null){
                  
                  inicio.classList.add("inicio");
      
                  const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
      
                  const inversiones=document.querySelector("#inversiones");
                  if(inversiones!=null){
                    inversiones.classList.remove("inversiones");
              
                  }
        
                  const estadoCuenta=document.querySelector("#estadoCuenta");
                  if(estadoCuenta!=null){
                    estadoCuenta.classList.remove("estadoCuenta");
                  }
                  
                  const subasta=document.querySelector("#subasta");
                  if(subasta!=null){
                    subasta.classList.remove("subasta");
                  }
                }
                
              
              }else if(url=="/empresa/dashboard"){
                this.cuentaUsuario=false;
                const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
                this.value0=true;
                this.value1=false;
                this.rutaActual = "Inicio";
                this.router.navigate([`/${this.tipoUsuario.toLowerCase()}/dashboard`]);
                const inicio=document.querySelector("#inicio");
      
                
      
                if(inicio !=null){
                  
                  inicio.classList.add("inicio");
      
                  const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
      
                  const inversiones=document.querySelector("#inversiones");
                  if(inversiones!=null){
                    inversiones.classList.remove("inversiones");
              
                  }
        
                  const estadoCuenta=document.querySelector("#estadoCuenta");
                  if(estadoCuenta!=null){
                    estadoCuenta.classList.remove("estadoCuenta");
                  }
                  
                  const subasta=document.querySelector("#subasta");
                  if(subasta!=null){
                    subasta.classList.remove("subasta");
                  }
                }
                
              
              }else if(url=="/estado-dashboard"){
                this.value0=true;
                this.value1=false;
                this.rutaActual = "Estado de Cuenta";
                this.router.navigate(['/estado-dashboard/movimiento']);
                const estadoCuenta=document.querySelector("#estadoCuenta");
      
                if(estadoCuenta !=null){
                  
                  estadoCuenta.classList.add("estadoCuenta");
      
                const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
      
                  const inicio=document.querySelector("#inicio");
                  if(inicio!=null){
                    inicio.classList.remove("inicio");
                  }
        
                  const inversiones=document.querySelector("#inversiones");
                  if(inversiones!=null){
                    inversiones.classList.remove("inversiones");
              
                  }
        
                  const subasta=document.querySelector("#subasta");
                  if(subasta!=null){
                    subasta.classList.remove("subasta");
                  }
                }
      
              }else if(url=="/estado-dashboard/movimiento"){
                this.value0=true;
                this.value1=false;
                this.rutaActual = "Estado de Cuenta / Movimiento";
                this.router.navigate(['/estado-dashboard/movimiento']);
                const estadoCuenta=document.querySelector("#estadoCuenta");
      
                if(estadoCuenta !=null){
                  
                  estadoCuenta.classList.add("estadoCuenta");
      
                const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
      
                  const inicio=document.querySelector("#inicio");
                  if(inicio!=null){
                    inicio.classList.remove("inicio");
                  }
        
                  const inversiones=document.querySelector("#inversiones");
                  if(inversiones!=null){
                    inversiones.classList.remove("inversiones");
              
                  }
        
                  const subasta=document.querySelector("#subasta");
                  if(subasta!=null){
                    subasta.classList.remove("subasta");
                  }
                }
      
              }else if(url=="/estado-dashboard/estado-cuenta-bancaria"){
                this.value0=true;
                this.value1=false;
                this.rutaActual = "Estado de Cuenta / Cuenta Bancaria";
                this.router.navigate(['/estado-dashboard/estado-cuenta-bancaria']);
                const estadoCuenta=document.querySelector("#estadoCuenta");
      
                if(estadoCuenta !=null){
                  
                  estadoCuenta.classList.add("estadoCuenta");
      
                const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
      
                  const inicio=document.querySelector("#inicio");
                  if(inicio!=null){
                    inicio.classList.remove("inicio");
                  }
        
                  const inversiones=document.querySelector("#inversiones");
                  if(inversiones!=null){
                    inversiones.classList.remove("inversiones");
              
                  }
        
                  const subasta=document.querySelector("#subasta");
                  if(subasta!=null){
                    subasta.classList.remove("subasta");
                  }
                }
      
              }else if(url=="/estado-dashboard/transferencia-cuenta-bancaria"){
                this.value0=true;
                this.value1=false;
                this.rutaActual = "Estado de Cuenta / Transferencia Cuenta Bancaria";
                this.router.navigate(['/estado-dashboard/transferencia-cuenta-bancaria']);
                const estadoCuenta=document.querySelector("#estadoCuenta");
      
                if(estadoCuenta !=null){
                  
                  estadoCuenta.classList.add("estadoCuenta");
      
                const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
      
                  const inicio=document.querySelector("#inicio");
                  if(inicio!=null){
                    inicio.classList.remove("inicio");
                  }
        
                  const inversiones=document.querySelector("#inversiones");
                  if(inversiones!=null){
                    inversiones.classList.remove("inversiones");
              
                  }
        
                  const subasta=document.querySelector("#subasta");
                  if(subasta!=null){
                    subasta.classList.remove("subasta");
                  }
                }
      
              }else if(url=="/estado-dashboard/estado-cuenta-bancaria/registrar-cuenta-bancaria"){
                this.value0=true;
                this.value1=false;
                this.rutaActual = "Estado de Cuenta / Cuenta Bancaria / Registrar Cuenta Bancaria";
                this.router.navigate(['/estado-dashboard/estado-cuenta-bancaria/registrar-cuenta-bancaria']);
                const estadoCuenta=document.querySelector("#estadoCuenta");
      
                if(estadoCuenta !=null){
                  
                  estadoCuenta.classList.add("estadoCuenta");
      
                const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
      
                  const inicio=document.querySelector("#inicio");
                  if(inicio!=null){
                    inicio.classList.remove("inicio");
                  }
        
                  const inversiones=document.querySelector("#inversiones");
                  if(inversiones!=null){
                    inversiones.classList.remove("inversiones");
              
                  }
        
                  const subasta=document.querySelector("#subasta");
                  if(subasta!=null){
                    subasta.classList.remove("subasta");
                  }
                }
      
              }else if(url=="/estado-dashboard/estado-cuenta-bancaria/actualizar-cuenta-bancaria/"+ultimo_numero){
                this.value0=true;
                this.value1=false;
                this.rutaActual = "Estado de Cuenta / Cuenta Bancaria / Actualizar Cuenta Bancaria";
                this.router.navigate(['/estado-dashboard/estado-cuenta-bancaria/actualizar-cuenta-bancaria/'+ultimo_numero]);
                const estadoCuenta=document.querySelector("#estadoCuenta");
      
                if(estadoCuenta !=null){
                  
                  estadoCuenta.classList.add("estadoCuenta");
      
                const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
      
                  const inicio=document.querySelector("#inicio");
                  if(inicio!=null){
                    inicio.classList.remove("inicio");
                  }
        
                  const inversiones=document.querySelector("#inversiones");
                  if(inversiones!=null){
                    inversiones.classList.remove("inversiones");
              
                  }
        
                  const subasta=document.querySelector("#subasta");
                  if(subasta!=null){
                    subasta.classList.remove("subasta");
                  }
                }
      
              }else if(url=="/inversionista/oportunidad-de-inversion" || url=="/empresa/subasta"){
                this.value0=true;
                this.value1=false;
                this.rutaActual = "Oportunidad de Inversión";
                // this.router.navigate(['/inversionista/oportunidad-de-inversion']);
      
                const subasta=document.querySelector("#subasta");
      
                if(subasta !=null){
                  
                  subasta.classList.add("subasta");
      
                const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
      
                  const inicio=document.querySelector("#inicio");
                  if(inicio!=null){
                    inicio.classList.remove("inicio");
                  }
        
                  const inversiones=document.querySelector("#inversiones");
                  if(inversiones!=null){
                    inversiones.classList.remove("inversiones");
              
                  }
                  
                  const estadoCuenta=document.querySelector("#estadoCuenta");
                  if(estadoCuenta!=null){
                    estadoCuenta.classList.remove("estadoCuenta");
                  }
                }
              }else if(url=="/inversionista/mis-inversiones"){
                this.value0=true;
                this.value1=false;
                this.rutaActual = "Mis Inversiones";
                this.router.navigate(['/inversionista/mis-inversiones']);
                const inversiones=document.querySelector("#inversiones");
      
                if(inversiones !=null){
                  
                  inversiones.classList.add("inversiones");
      
                const micuenta=document.querySelector("#micuenta");
                  if(micuenta!=null){
                    micuenta.classList.remove("micuenta");
                  }
      
                  const inicio=document.querySelector("#inicio");
                  if(inicio!=null){
                    inicio.classList.remove("inicio");
                  }
                  const subasta=document.querySelector("#subasta");
                  if(subasta!=null){
                    subasta.classList.remove("subasta");
                  }
                  
                  const estadoCuenta=document.querySelector("#estadoCuenta");
                  if(estadoCuenta!=null){
                    estadoCuenta.classList.remove("estadoCuenta");
                  }
                }
              } 
            }
          }
        });



  };

  // cargarCuentaBancaria(): void {
  //   debugger
    
  // }

  cuentaUsuario:boolean=false;
  nombre:string='';
  apellidoPaterno:string='';
  apellidoMaterno:string='';
  value0:boolean=true;
  value1:boolean=false;
  

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser);
    if(currentUser!==null){
      this.nombre=currentUser[0].nombres;
      // this.nombre=""; 
      this.apellidoPaterno=currentUser[0].apellidoPaterno;
      this.apellidoMaterno=currentUser[0].apellidoPaterno;
    }
    
  }


  clickUsuario(){
    const usuarioLogin=document.querySelector("#usuario_log_mostrar");
    if(usuarioLogin!=null){
      usuarioLogin.classList.toggle("usuario_log_mostrar");
    }
  }
  miCuenta(){
    this.value0=false;
    this.value1=true;
    this.cuentaUsuario=true;
    this.router.navigate([`/micuenta/personal/${this.usuario.id}`]);
    const micuenta=document.querySelector("#micuenta");
    if(micuenta != null){
          micuenta.classList.add("micuenta");
    }
    const inicio=document.querySelector("#inicio");
    if(inicio!=null){
      inicio.classList.remove("inicio");
    }
    const movimiento=document.querySelector("#movimiento");
    if(movimiento!=null){
      movimiento.classList.remove("movimiento");
    }

    const cuentaBancaria=document.querySelector("#cuentaBancaria");
    if(cuentaBancaria!=null){
      cuentaBancaria.classList.remove("cuentaBancaria");
    }

    const deposito=document.querySelector("#deposito");
    if(deposito!=null){
      deposito.classList.remove("deposito");
    }

    const estadoCuenta=document.querySelector("#estadoCuenta");
    if(estadoCuenta!=null){
      estadoCuenta.classList.remove("estadoCuenta");
    }
    
    const subasta=document.querySelector("#subasta");
    if(subasta!=null){
      subasta.classList.remove("subasta");
    }

    const usuarioLogin=document.querySelector("#usuario_log_mostrar");
    if(usuarioLogin!=null){
      usuarioLogin.classList.toggle("usuario_log_mostrar");
    }

    const inversiones=document.querySelector("#inversiones");
    if(inversiones!=null){
      inversiones.classList.remove("inversiones");

    }

  }


  ClickInicio(){
    this.cuentaUsuario=false;
    this.value0=true;
    this.value1=false;
    this.router.navigate([`/${this.tipoUsuario.toLowerCase()}/dashboard`]);
    const inicio=document.querySelector("#inicio");
    inicio.classList.add("inicio");

    const estadoCuenta=document.querySelector("#estadoCuenta");
    estadoCuenta.classList.remove("estadoCuenta");

    const inversiones=document.querySelector("#inversiones");
    if(inversiones!=null){
      inversiones.classList.remove("inversiones");

    }

    const subasta=document.querySelector("#subasta");
    subasta.classList.remove("subasta");

    const micuenta=document.querySelector("#micuenta");
    if(micuenta!=null){
      micuenta.classList.remove("micuenta");
    }
  }  
  ClickSubasta(){
    this.cuentaUsuario=false;
    this.value0=true;
          this.value1=false;
    if(this.tipoUsuario=="Inversionista"){
      this.router.navigate([`/${this.tipoUsuario.toLowerCase()}/oportunidad-de-inversion`]);
    }
    if(this.tipoUsuario=="Empresa"){
      this.router.navigate([`/${this.tipoUsuario.toLowerCase()}/subasta`]);
    }
    const subasta=document.querySelector("#subasta");
    subasta.classList.add("subasta");

    const inicio=document.querySelector("#inicio");
    inicio.classList.remove("inicio");

    const estadoCuenta=document.querySelector("#estadoCuenta");
    estadoCuenta.classList.remove("estadoCuenta");
    
    const inversiones=document.querySelector("#inversiones");
    if(inversiones!=null){
      inversiones.classList.remove("inversiones");

    }


    const micuenta=document.querySelector("#micuenta");
    if(micuenta!=null){
      micuenta.classList.remove("micuenta");
    }

  }
  ClickInversiones(){
    this.cuentaUsuario=false;
    this.value0=true;
          this.value1=false;
    this.router.navigate(['/inversionista/mis-inversiones']);
    const inversiones=document.querySelector("#inversiones");
    inversiones.classList.add("inversiones");

    const subasta=document.querySelector("#subasta");
    subasta.classList.remove("subasta");

    const inicio=document.querySelector("#inicio");
    inicio.classList.remove("inicio");

    const micuenta=document.querySelector("#micuenta");
    if(micuenta!=null){
      micuenta.classList.remove("micuenta");
    }
    const estadoCuenta=document.querySelector("#estadoCuenta");
    estadoCuenta.classList.remove("estadoCuenta");
  }



  ClickBancos(){
    this.cuentaUsuario=false;
    this.value0=true;
   this.value1=false;
   
    this.router.navigate(['listar-banco-mongo']);
    const inversiones=document.querySelector("#inversiones");
    inversiones.classList.add("inversiones");

    const subasta=document.querySelector("#subasta");
    subasta.classList.remove("subasta");

    const inicio=document.querySelector("#inicio");
    inicio.classList.remove("inicio");

    const micuenta=document.querySelector("#micuenta");
    if(micuenta!=null){
      micuenta.classList.remove("micuenta");
    }
    const estadoCuenta=document.querySelector("#estadoCuenta");
    estadoCuenta.classList.remove("estadoCuenta");
  }


  ClickMonedas(){
    this.cuentaUsuario=false;
    this.value0=true;
   this.value1=false;
   
    this.router.navigate(['listar-moneda-postgre']);
    const inversiones=document.querySelector("#inversiones");
    inversiones.classList.add("inversiones");

    const subasta=document.querySelector("#subasta");
    subasta.classList.remove("subasta");

    const inicio=document.querySelector("#inicio");
    inicio.classList.remove("inicio");

    const micuenta=document.querySelector("#micuenta");
    if(micuenta!=null){
      micuenta.classList.remove("micuenta");
    }
    const estadoCuenta=document.querySelector("#estadoCuenta");
    estadoCuenta.classList.remove("estadoCuenta");
  }


























  clickEstadoCuenta(){
    this.cuentaUsuario=false;
    this.value0=true;
          this.value1=false;
    this.router.navigate(['/estado-dashboard/movimiento']);
    const estadoCuenta=document.querySelector("#estadoCuenta");
    estadoCuenta.classList.add("estadoCuenta");

    const inicio=document.querySelector("#inicio");
    inicio.classList.remove("inicio");

    const inversiones=document.querySelector("#inversiones");
    if(inversiones!=null){
      inversiones.classList.remove("inversiones");

    }

    const subasta=document.querySelector("#subasta");
    subasta.classList.remove("subasta");

    const micuenta=document.querySelector("#micuenta");
    if(micuenta!=null){
      micuenta.classList.remove("micuenta");
    }

  }

  clickCerrarSesion(){
    this.authService.logout();
    const usuarioLogin=document.querySelector("#usuario_log_mostrar");
    if(usuarioLogin!=null){
      usuarioLogin.classList.toggle("usuario_log_mostrar");
    }
  }

}
