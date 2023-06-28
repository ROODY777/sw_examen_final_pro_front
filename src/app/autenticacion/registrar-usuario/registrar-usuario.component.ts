import { Component, OnInit, Renderer2, ElementRef , ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Cartera } from 'src/app/cartera';
import { AuthService } from 'src/app/services/AuthService.service';
import { TipoPerfilUsuario } from 'src/app/tipoperfilusuario';
import { Usuario } from 'src/app/usuario';
import { UsuarioService } from 'src/app/usuario.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  @ViewChild('inputCorreo') inputCorreo!: ElementRef<HTMLInputElement>;
  @ViewChild('inputContraseña') inputContraseña!: ElementRef<HTMLInputElement>;
  @ViewChild('inputNombre') inputNombre!: ElementRef<HTMLInputElement>;
  @ViewChild('inputApellidoPaterno') inputApellidoPaterno!: ElementRef<HTMLInputElement>;
  @ViewChild('inputApellidoMaterno') inputApellidoMaterno!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDireccion') inputDireccion!: ElementRef<HTMLInputElement>;
  @ViewChild('inputRuc') inputRuc!: ElementRef<HTMLInputElement>;
  @ViewChild('inputTelefono') inputTelefono!: ElementRef<HTMLInputElement>;
  @ViewChild('inputRazonsocial') inputRazonsocial!: ElementRef<HTMLInputElement>;
  @ViewChild('inputActividadcomercial') inputActividadcomercial!: ElementRef<HTMLInputElement>;
  @ViewChild('inputDescripcion') inputDescripcion!: ElementRef<HTMLInputElement>;

  //Imagen de Login
  imageSrc = 'assets/imagenes/imagen_fondo.jpg';
  imageSrcLogo = 'assets/imagenes/logo2.png';
  imageSrcLogo2 = 'assets/imagenes/logo.png';

  usuario: Usuario = new Usuario();
  cartera: Cartera = new Cartera();
  tipoPerfil: TipoPerfilUsuario=new TipoPerfilUsuario();

  tiposPerfilesUsuario: any = [];

  // isError:boolean=true;
  disableSubmitButton:boolean = false
  
  disableInput=false;
  
  selectedOption: string = '';


  //Perfil inversion
  perfilInversion: boolean = true;//Siempre va a mostrar el checked de inversion
  perfilEmpresa: boolean = false;

  //correo
  emailInvalid: boolean = false;
  emailEmpty: boolean = false;
  emailExiste: boolean = false;
  //contraseña
  passwordEmpy: boolean = false;
  passwordInvalid: boolean = false;
  //Nombre
  nameEmpy: boolean = false;
  nameInvalid: boolean = false;
  nameEnable: boolean = true;
  //Apellido Paterno
  apellidoPaternoEmpy: boolean = false;
  apellidoPaternoInvalid: boolean = false;
  apellidoPaternoEnable: boolean = true;
  //Apellido Materno
  apellidoMaternoEmpy: boolean = false;
  apellidoMaternoInvalid: boolean = false;
  apellidoMaternoEnable: boolean = true;
  //Telefono
  telefonoEmpy: boolean = false;
  telefonoInvalid: boolean = false;
  //Direccion
  direccionInvalid:boolean=false;
  direccionEmpy:boolean=false;

  //Ruc
  rucEmpy: boolean = false;
  rucInvalid: boolean = false;
  rucEnable: boolean = false;
  rucExiste: boolean = false

  //Razon Social
  razonsocialEmpy:boolean =false;
  razonsocialInvalid: boolean = false;
  razonsocialEnable: boolean = false;

  //Actividad Comercial
  actividadcomercialEmpy:boolean =false;
  actividadcomercialInvalid: boolean = false;
  actividadcomercialEnable: boolean = false;

  //Descripcion
  descripcionEmpy:boolean =false;
  descripcionInvalid: boolean = false;
  descripcionEnable: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router,private renderer: Renderer2, private el: ElementRef,private autService: AuthService) {

   }


  ngOnInit(): void {

  }

  //Validar Email
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  //Validar Contraseña
  validarPassword(password: string) {
    const expresion = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return expresion.test(password);
  }
  //Validar Nombre
  validarNombre(nombre: string) {
    const expresion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?$/;
    const longitudMaxima = 30;
    return expresion.test(nombre) && nombre.length <= longitudMaxima;
  }
  //Validar Apellido
  validarApellido(apellido: string) {
    const expresion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+(\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+)?$/;
    const longitudMaxima = 20;
    return expresion.test(apellido) && apellido.length <= longitudMaxima;
  }

  validarDireccion(direccion: string) {
    const expresion = /^(?!^\s)[A-Za-z\d\s.,-]+$/;
    return expresion.test(direccion);
  }
  //Validar Telefono
  validarTelefono(telefono: string) {
    const expresion = /^9\d{8}$/
    return expresion.test(telefono);
  }
  //Validar RUC
  validarRUC(ruc: string) {
    const expresion = /^(10|20)\d{9}$/;
    return expresion.test(ruc);
  }

  //Validar Razon Social 
  validarRazonsocial(razonSocial: string){
    const expresion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return expresion.test(razonSocial);
  }

  //Validar Actividad Comercial
  validarActividadComercial(actividadComercial: string){
    const expresion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return expresion.test(actividadComercial);
  } 

  // validar Descripcion
  validarDescripcion(descripcion:string){
    // const expresion= 
    return true;
  }

  inversionista(){
    const perfil_i=document.querySelector(".perfil_i") as HTMLInputElement;
    if(perfil_i!=undefined){
      perfil_i.checked = true;
      this.tiposPerfilesUsuario={ id: 1, nombre: perfil_i.value };
      // console.log(perfil_i.value);
    }
    
    //Ruc
    this.rucEnable=false;
    this.rucEmpy=false;
    this.rucExiste=false;
    this.rucInvalid=false;
    this.usuario.ruc="";

    //Razon Social
    this.razonsocialEnable=false
    this.razonsocialEmpy=false;
    this.razonsocialInvalid=false;
    this.usuario.razonSocial="";

    //Actividad Comercial
    this.actividadcomercialEnable=false;
    this.actividadcomercialInvalid=false;
    this.actividadcomercialEmpy=false;
    this.usuario.actividadcomercial="";

    //Descripcion
    this.descripcionEnable=false;
    this.descripcionInvalid=false;
    this.descripcionEmpy=false;
    this.usuario.descripcion="";
    
    this.nameEnable=true;
    this.apellidoPaternoEnable=true;
    this.apellidoMaternoEnable=true;

    this.perfilInversion=true;
    this.perfilEmpresa=false;
    
  }
  empresa(){
    const perfil_e=document.querySelector(".perfil_e") as HTMLInputElement;
    if(perfil_e!=undefined){
      perfil_e.checked = true;
      this.tiposPerfilesUsuario={ id: 2, nombre: perfil_e.value };
    }
    //Nombre
    this.nameEnable=false;
    this.nameEmpy=false;
    this.nameInvalid=false;
    this.usuario.nombres="";
    //Apellido paterno
    this.apellidoPaternoEnable=false;
    this.apellidoPaternoEmpy=false;
    this.apellidoPaternoInvalid=false;
    this.usuario.apellidoPaterno="";
    //Apellido Materno
    this.apellidoMaternoEnable=false;
    this.apellidoMaternoEmpy=false;
    this.apellidoMaternoInvalid=false;
    this.usuario.apellidoMaterno="";

    this.rucEnable=true;
    this.razonsocialEnable=true
    this.actividadcomercialEnable=true;
    this.descripcionEnable=true;

    this.perfilInversion=false;
    this.perfilEmpresa=true;
  }


  // Correo
  handleInputChangeEmail(){
    this.disableSubmitButton=false;
    // this.isError=false;
    this.emailInvalid = false;
    this.emailEmpty = false;
    this.emailExiste=false;

    const span_correo_focus_error=document.querySelector(".span_correo_focus_error");
    if(span_correo_focus_error!=null){
      span_correo_focus_error.classList.replace('span_correo_focus_error','span_correo_focus');
    }
    const correo_focus_error=document.querySelector(".correo_focus_error");
    if(correo_focus_error!=null){
      correo_focus_error.classList.replace('correo_focus_error','correo_focus')
    }
  }
  correoFocus(){
    const span_correo=document.querySelector(".span-correo");
    if(span_correo!=null){
      span_correo.classList.replace("span-correo","span_correo_focus");
    }
    const correo=document.querySelector(".correo");
    if(correo!=null){
      correo.classList.replace("correo","correo_focus");
    }

    const span_correo_id=document.getElementById('span_correo');
    if(span_correo_id!=null){
      span_correo_id.classList.remove("span-correo_error");
    }
    this.emailEmpty = false;  
  }
  correoBlur(){
    const span_correo_focus=document.querySelector(".span_correo_focus");
    if(span_correo_focus!=null){
      span_correo_focus.classList.replace("span_correo_focus","span-correo");
    }
    const correo_focus=document.querySelector(".correo_focus");
    if(correo_focus!=null){
      correo_focus.classList.replace("correo_focus","correo");
    }
      if(this.usuario.email==undefined || this.usuario.email==""){
        const span_correo_focus=document.querySelector(".span_correo_focus");
        if(span_correo_focus!=null){
          span_correo_focus.classList.replace("span_correo_focus","span-correo");
        }
        const correo_focus=document.querySelector(".correo_focus");
        if(correo_focus!=null){
          correo_focus.classList.replace("correo_focus","correo");
        }
      }else{
        const span_correo=document.querySelector(".span-correo");
        if(span_correo!=null){
          span_correo.classList.replace("span-correo","span_correo_focus");
        }
        const correo=document.querySelector(".correo");
        if(correo!=null){
          correo.classList.replace("correo","correo_focus");
        }
      }

      const correo = document.getElementById('correo');
      const span_correo=document.getElementById('span_correo');
      if(!this.usuario.email){
        this.emailInvalid = false;
        this.emailEmpty = true;
        // this.isError=false;
        correo.classList.add('correo_error');
        span_correo.classList.add('span-correo_error');
        return;
      }
      this.emailEmpty = false;
      // this.isError=false;
      this.emailInvalid = !this.validateEmail(this.usuario.email);
      if(this.emailInvalid){
        correo.classList.replace('correo_focus','correo_focus_error');
        span_correo.classList.replace('span_correo_focus','span_correo_focus_error');
      }
  }
  span_correoClick(event: MouseEvent){
    if(this.disableInput===false){
      const span_correo=document.querySelector(".span-correo");
      if(span_correo!=null){
        span_correo.classList.replace("span-correo","span_correo_focus");
      }
      const correo=document.querySelector(".correo");
          if(correo!=null){
            correo.classList.replace("correo","correo_focus");
          }
      const span_correo_focus=document.querySelector(".span_correo_focus");
      if(span_correo_focus!=null){
        const clickedElement = event.target as HTMLElement;
        if (this.inputCorreo && clickedElement !== this.inputCorreo.nativeElement) {
          this.inputCorreo.nativeElement.focus();
        }
      }
    }
    
  }

  //Contraseña
  handleInputChangePassword(){
    this.disableSubmitButton=false;
    this.passwordInvalid = false;
    this.passwordEmpy = false;
    const span_contraseña_focus_error=document.querySelector(".span_contraseña_focus_error");
    if(span_contraseña_focus_error!=null){
      span_contraseña_focus_error.classList.replace('span_contraseña_focus_error','span_contraseña_focus');
    }
    const contraseña_focus_error=document.querySelector(".contraseña_focus_error");
    if(contraseña_focus_error!=null){
      contraseña_focus_error.classList.replace('contraseña_focus_error','contraseña_focus');
    }
  }
  contrasenaFocus(){
    const span_contraseña=document.querySelector(".span-contraseña");
    if(span_contraseña!=null){
      span_contraseña.classList.replace("span-contraseña","span_contraseña_focus");
    }
    const contraseña=document.querySelector(".contraseña");
    if(contraseña!=null){
      contraseña.classList.replace("contraseña","contraseña_focus");
    }
    const span_contraseña_id=document.getElementById('span_contraseña');
    if(span_contraseña_id!=null){
      span_contraseña_id.classList.remove("span-contraseña_error");
    }
    this.passwordEmpy = false;
  }
  contrasenaBlur(){
    const span_contraseña_focus=document.querySelector(".span_contraseña_focus");
    if(span_contraseña_focus!=null){
      span_contraseña_focus.classList.replace("span_contraseña_focus","span-contraseña");
    }
    const contraseña_focus=document.querySelector(".contraseña_focus");
    if(contraseña_focus!=null){
      contraseña_focus.classList.replace("contraseña_focus","contraseña");
    }
      if(this.usuario.contrasena==undefined || this.usuario.contrasena==""){
        const span_contraseña_focus=document.querySelector(".span_contraseña_focus");
        if(span_contraseña_focus!=null){
          span_contraseña_focus.classList.replace("span_contraseña_focus","span-contraseña");
        }
        const contraseña_focus=document.querySelector(".contraseña_focus");
        if(contraseña_focus!=null){
          contraseña_focus.classList.replace("contraseña_focus","contraseña");
        }
      }else{
        const span_contraseña=document.querySelector(".span-contraseña");
        if(span_contraseña!=null){
          span_contraseña.classList.replace("span-contraseña","span_contraseña_focus");
        }
        const contraseña=document.querySelector(".contraseña");
        if(contraseña!=null){
          contraseña.classList.replace("contraseña","contraseña_focus");
        }
      }

      const contraseña = document.getElementById('contraseña');
      const span_contraseña=document.getElementById('span_contraseña');
      if(!this.usuario.contrasena){
        this.passwordInvalid = false;
        this.passwordEmpy = true;
        contraseña.classList.add('contraseña_error');
        span_contraseña.classList.add('span-contraseña_error');
        return;
      }
      this.passwordEmpy = false;
      this.passwordInvalid = !this.validarPassword(this.usuario.contrasena);
      if(this.passwordInvalid){
        contraseña.classList.replace('contraseña_focus','contraseña_focus_error');
        span_contraseña.classList.replace('span_contraseña_focus','span_contraseña_focus_error');
      }
  }
  clickVisibility(){
    if(this.disableInput===false){
    this.inputContraseña.nativeElement.type="text";
    const visibility=document.querySelector(".visibility");
    if(visibility!= null){
      visibility.classList.replace("visibility","visibility_off")
    }
    const no_visibility=document.querySelector(".no_visibility");
    if(no_visibility!= null){
      no_visibility.classList.replace("no_visibility","no_visibility_off");
    }
  }
  }
  clickNoVisibility(){
    if(this.disableInput===false){
    this.inputContraseña.nativeElement.type="password";
    const no_visibility_off=document.querySelector(".no_visibility_off");
    if(no_visibility_off!= null){
      no_visibility_off.classList.replace("no_visibility_off","no_visibility");
    }
    const visibility_off=document.querySelector(".visibility_off");
    if(visibility_off!= null){
      visibility_off.classList.replace("visibility_off","visibility")
    }
  }
  }
  span_contrasenaClick(event:MouseEvent){
    if(this.disableInput===false){
    const span_contraseña=document.querySelector(".span-contraseña");
    if(span_contraseña!=null){
      span_contraseña.classList.replace("span-contraseña","span_contraseña_focus");
    }
    const contraseña=document.querySelector(".contraseña");
    if(contraseña!=null){
      contraseña.classList.replace("contraseña","contraseña_focus");
    }
    const span_contraseña_focus=document.querySelector(".span_contraseña_focus");
    if(span_contraseña_focus!=null){
      const clickedElement = event.target as HTMLElement;
      if (this.inputContraseña && clickedElement !== this.inputContraseña.nativeElement) {
        this.inputContraseña.nativeElement.focus();
      }
    }
    }
  }

  //Nombre
  handleInputChangeNombre(){
    this.disableSubmitButton=false;
    this.nameInvalid = false;
    this.nameEmpy = false;
    const span_nombre_focus_error=document.querySelector(".span_nombre_focus_error");
    if(span_nombre_focus_error!=null){
      span_nombre_focus_error.classList.replace('span_nombre_focus_error','span_nombre_focus');
    }
    const nombre_focus_error=document.querySelector(".nombre_focus_error");
    if(nombre_focus_error!=null){
      nombre_focus_error.classList.replace('nombre_focus_error','nombre_focus')
    }
  }
  nombreFocus(){
    const span_nombre=document.querySelector(".span-nombre");
    if(span_nombre!=null){
      span_nombre.classList.replace("span-nombre","span_nombre_focus");
    }
    const nombre=document.querySelector(".nombre");
    if(nombre!=null){
      nombre.classList.replace("nombre","nombre_focus");
    }
    const span_nombre_id=document.getElementById('span_nombre');
    if(span_nombre_id!=null){
      span_nombre_id.classList.remove("span-nombre_error");
    }
    this.nameEmpy = false;
  }
  nombreBlur(){
    const span_nombre_focus=document.querySelector(".span_nombre_focus");
    if(span_nombre_focus!=null){
      span_nombre_focus.classList.replace("span_nombre_focus","span-nombre");
    }
    const nombre_focus=document.querySelector(".nombre_focus");
    if(nombre_focus!=null){
      nombre_focus.classList.replace("nombre_focus","nombre");
    }
      if(this.usuario.nombres==undefined || this.usuario.nombres==""){
        const span_nombre_focus=document.querySelector(".span_nombre_focus");
        if(span_nombre_focus!=null){
          span_nombre_focus.classList.replace("span_nombre_focus","span-nombre");
        }
        const nombre_focus=document.querySelector(".nombre_focus");
        if(nombre_focus!=null){
          nombre_focus.classList.replace("nombre_focus","nombre");
        }
      }else{
        const span_nombre=document.querySelector(".span-nombre");
        if(span_nombre!=null){
          span_nombre.classList.replace("span-nombre","span_nombre_focus");
        }
        const nombre=document.querySelector(".nombre");
        if(nombre!=null){
          nombre.classList.replace("nombre","nombre_focus");
        }
      }

      const nombre = document.getElementById('nombre');
      const span_nombre=document.getElementById('span_nombre');
      if(!this.usuario.nombres){
        this.nameInvalid=false
        this.nameEmpy = true;
        nombre.classList.add('nombre_error');
        span_nombre.classList.add('span-nombre_error');
        return;
      }
      this.nameEmpy = false;
      this.nameInvalid = !this.validarNombre(this.usuario.nombres);
      
      if(this.nameInvalid){
        nombre.classList.replace('nombre_focus','nombre_focus_error');
        span_nombre.classList.replace('span_nombre_focus','span_nombre_focus_error');
      }
  }
  span_nombreClick(event:MouseEvent){
    if(this.disableInput===false){
    const span_nombre=document.querySelector(".span-nombre");
    if(span_nombre!=null){
      span_nombre.classList.replace("span-nombre","span_nombre_focus");
    }
    const nombre=document.querySelector(".nombre");
    if(nombre!=null){
      nombre.classList.replace("nombre","nombre_focus");
    }
    const span_nombre_focus=document.querySelector(".span_nombre_focus");
    if(span_nombre_focus!=null){
      const clickedElement = event.target as HTMLElement;
      if (this.inputNombre && clickedElement !== this.inputNombre.nativeElement) {
        this.inputNombre.nativeElement.focus();
      }
    }
    }
  }

  //Apellido Paterno
  handleInputChangeApellidoPaterno(){
    this.disableSubmitButton=false;
    this.apellidoPaternoInvalid = false;
    this.apellidoPaternoEmpy = false;
    const span_apellidoPaterno_focus_error=document.querySelector(".span_apellidoPaterno_focus_error");
    if(span_apellidoPaterno_focus_error!=null){
      span_apellidoPaterno_focus_error.classList.replace('span_apellidoPaterno_focus_error','span_apellidoPaterno_focus');
    }
    const apellidoPaterno_focus_error=document.querySelector(".apellidoPaterno_focus_error");
    if(apellidoPaterno_focus_error!=null){
      apellidoPaterno_focus_error.classList.replace('apellidoPaterno_focus_error','apellidoPaterno_focus')
    }
  }
  apellidoPaternoFocus(){
    const span_apellidoPaterno=document.querySelector(".span-apellidoPaterno");
    if(span_apellidoPaterno!=null){
      span_apellidoPaterno.classList.replace("span-apellidoPaterno","span_apellidoPaterno_focus");
    }
    const apellidoPaterno=document.querySelector(".apellidoPaterno");
    if(apellidoPaterno!=null){
      apellidoPaterno.classList.replace("apellidoPaterno","apellidoPaterno_focus");
    }

    const span_apellidoPaterno_id=document.getElementById('span_apellidoPaterno');
    if(span_apellidoPaterno_id!=null){
      span_apellidoPaterno_id.classList.remove("span-apellidoPaterno_error");
    }
    this.apellidoPaternoEmpy = false;
  }
  apellidoPaternoBlur(){
    const span_apellidoPaterno_focus=document.querySelector(".span_apellidoPaterno_focus");
    if(span_apellidoPaterno_focus!=null){
      span_apellidoPaterno_focus.classList.replace("span_apellidoPaterno_focus","span-apellidoPaterno");
    }
    const apellidoPaterno_focus=document.querySelector(".apellidoPaterno_focus");
    if(apellidoPaterno_focus!=null){
      apellidoPaterno_focus.classList.replace("apellidoPaterno_focus","apellidoPaterno");
    }
      if(this.usuario.apellidoPaterno==undefined || this.usuario.apellidoPaterno==""){
        const span_apellidoPaterno_focus=document.querySelector(".span_apellidoPaterno_focus");
        if(span_apellidoPaterno_focus!=null){
          span_apellidoPaterno_focus.classList.replace("span_apellidoPaterno_focus","span-apellidoPaterno");
        }
        const apellidoPaterno_focus=document.querySelector(".apellidoPaterno_focus");
        if(apellidoPaterno_focus!=null){
          apellidoPaterno_focus.classList.replace("apellidoPaterno_focus","apellidoPaterno");
        }
      }else{
        const span_apellidoPaterno=document.querySelector(".span-apellidoPaterno");
        if(span_apellidoPaterno!=null){
          span_apellidoPaterno.classList.replace("span-apellidoPaterno","span_apellidoPaterno_focus");
        }
        const apellidoPaterno=document.querySelector(".apellidoPaterno");
        if(apellidoPaterno!=null){
          apellidoPaterno.classList.replace("apellidoPaterno","apellidoPaterno_focus");
        }
      }
      const apellidoPaterno = document.getElementById('apellidoPaterno');
      const span_apellidoPaterno=document.getElementById('span_apellidoPaterno');
      if(!this.usuario.apellidoPaterno){
        this.apellidoPaternoInvalid=false
        this.apellidoPaternoEmpy = true;
        apellidoPaterno.classList.add('apellidoPaterno_error');
        span_apellidoPaterno.classList.add('span-apellidoPaterno_error');
        return;
      }
      this.apellidoPaternoEmpy = false;
      this.apellidoPaternoInvalid = !this.validarApellido(this.usuario.apellidoPaterno);
      
      if(this.apellidoPaternoInvalid){
        apellidoPaterno.classList.replace('apellidoPaterno_focus','apellidoPaterno_focus_error');
        span_apellidoPaterno.classList.replace('span_apellidoPaterno_focus','span_apellidoPaterno_focus_error');
      }

      

  }
  span_apellidoPaternoClick(event:MouseEvent){
    if(this.disableInput===false){
    const span_apellidoPaterno=document.querySelector(".span-apellidoPaterno");
    if(span_apellidoPaterno!=null){
      span_apellidoPaterno.classList.replace("span-apellidoPaterno","span_apellidoPaterno_focus");
    }
    const apellidoPaterno=document.querySelector(".apellidoPaterno");
    if(apellidoPaterno!=null){
      apellidoPaterno.classList.replace("apellidoPaterno","apellidoPaterno_focus");
    }
    
    const span_apellidoPaterno_focus=document.querySelector(".span_apellidoPaterno_focus");
    if(span_apellidoPaterno_focus!=null){
      const clickedElement = event.target as HTMLElement;
      if (this.inputApellidoPaterno && clickedElement !== this.inputApellidoPaterno.nativeElement) {
        this.inputApellidoPaterno.nativeElement.focus();
      }
    }
    }
  }

  //Apeliido Materno
  handleInputChangeApellidoMaterno(){
    this.disableSubmitButton=false;
    this.apellidoMaternoInvalid = false;
    this.apellidoMaternoEmpy = false;
    const span_apellidoMaterno_focus_error=document.querySelector(".span_apellidoMaterno_focus_error");
    if(span_apellidoMaterno_focus_error!=null){
      span_apellidoMaterno_focus_error.classList.replace('span_apellidoMaterno_focus_error','span_apellidoMaterno_focus');
    }
    const apellidoMaterno_focus_error=document.querySelector(".apellidoMaterno_focus_error");
    if(apellidoMaterno_focus_error!=null){
      apellidoMaterno_focus_error.classList.replace('apellidoMaterno_focus_error','apellidoMaterno_focus')
    }
  }
  apellidoMaternoFocus(){
    const span_apellidoMaterno=document.querySelector(".span-apellidoMaterno");
    if(span_apellidoMaterno!=null){
      span_apellidoMaterno.classList.replace("span-apellidoMaterno","span_apellidoMaterno_focus");
    }
    const apellidoMaterno=document.querySelector(".apellidoMaterno");
    if(apellidoMaterno!=null){
      apellidoMaterno.classList.replace("apellidoMaterno","apellidoMaterno_focus");
    }
    const span_apellidoMaterno_id=document.getElementById('span_apellidoMaterno');
      if(span_apellidoMaterno_id!=null){
        span_apellidoMaterno_id.classList.remove("span-apellidoMaterno_error");
      }
      this.apellidoMaternoEmpy = false;
  }
  apellidoMaternoBlur(){
    const span_apellidoMaterno_focus=document.querySelector(".span_apellidoMaterno_focus");
    if(span_apellidoMaterno_focus!=null){
      span_apellidoMaterno_focus.classList.replace("span_apellidoMaterno_focus","span-apellidoMaterno");
    }
    const apellidoMaterno_focus=document.querySelector(".apellidoMaterno_focus");
    if(apellidoMaterno_focus!=null){
      apellidoMaterno_focus.classList.replace("apellidoMaterno_focus","apellidoMaterno");
    }
      if(this.usuario.apellidoMaterno==undefined || this.usuario.apellidoMaterno==""){
        const span_apellidoMaterno_focus=document.querySelector(".span_apellidoMaterno_focus");
        if(span_apellidoMaterno_focus!=null){
          span_apellidoMaterno_focus.classList.replace("span_apellidoMaterno_focus","span-apellidoMaterno");
        }
        const apellidoMaterno_focus=document.querySelector(".apellidoMaterno_focus");
        if(apellidoMaterno_focus!=null){
          apellidoMaterno_focus.classList.replace("apellidoMaterno_focus","apellidoMaterno");
        }
      }else{
        const span_apellidoMaterno=document.querySelector(".span-apellidoMaterno");
        if(span_apellidoMaterno!=null){
          span_apellidoMaterno.classList.replace("span-apellidoMaterno","span_apellidoMaterno_focus");
        }
        const apellidoMaterno=document.querySelector(".apellidoMaterno");
        if(apellidoMaterno!=null){
          apellidoMaterno.classList.replace("apellidoMaterno","apellidoMaterno_focus");
        }
      }
      const apellidoMaterno = document.getElementById('apellidoMaterno');
      const span_apellidoMaterno=document.getElementById('span_apellidoMaterno');
      if(!this.usuario.apellidoMaterno){
        this.apellidoMaternoInvalid=false
        this.apellidoMaternoEmpy = true;
        apellidoMaterno.classList.add('apellidoMaterno_error');
        span_apellidoMaterno.classList.add('span-apellidoMaterno_error');
        return;
      }
      this.apellidoMaternoEmpy = false;
      this.apellidoMaternoInvalid = !this.validarApellido(this.usuario.apellidoMaterno);
      
      if(this.apellidoMaternoInvalid){
        apellidoMaterno.classList.replace('apellidoMaterno_focus','apellidoMaterno_focus_error');
        span_apellidoMaterno.classList.replace('span_apellidoMaterno_focus','span_apellidoMaterno_focus_error');
      }

  }
  span_apellidoMaternoClick(event:MouseEvent){
    if(this.disableInput===false){
    const span_apellidoMaterno=document.querySelector(".span-apellidoMaterno");
    if(span_apellidoMaterno!=null){
      span_apellidoMaterno.classList.replace("span-apellidoMaterno","span_apellidoMaterno_focus");
    }
    const apellidoMaterno=document.querySelector(".apellidoMaterno");
    if(apellidoMaterno!=null){
      apellidoMaterno.classList.replace("apellidoMaterno","apellidoMaterno_focus");
    }
    
    const span_apellidoMaterno_focus=document.querySelector(".span_apellidoMaterno_focus");
    if(span_apellidoMaterno_focus!=null){
      const clickedElement = event.target as HTMLElement;
      if (this.inputApellidoMaterno && clickedElement !== this.inputApellidoMaterno.nativeElement) {
        this.inputApellidoMaterno.nativeElement.focus();
      }
    }
    }
  }

  //Dirección
  handleInputChangeDireccion(){
    this.disableSubmitButton=false;
    this.direccionInvalid = false;
    this.direccionEmpy = false;
    const span_direccion_focus_error=document.querySelector(".span_direccion_focus_error");
    if(span_direccion_focus_error!=null){
      span_direccion_focus_error.classList.replace('span_direccion_focus_error','span_direccion_focus');
    }
    const direccion_focus_error=document.querySelector(".direccion_focus_error");
    if(direccion_focus_error!=null){
      direccion_focus_error.classList.replace('direccion_focus_error','direccion_focus')
    }
  }
  direccionFocus(){
    const span_direccion=document.querySelector(".span-direccion");
    if(span_direccion!=null){
      span_direccion.classList.replace("span-direccion","span_direccion_focus");
    }
    const direccion=document.querySelector(".direccion");
    if(direccion!=null){
      direccion.classList.replace("direccion","direccion_focus");
    }
    const span_direccion_id=document.getElementById('span_direccion');
      if(span_direccion_id!=null){
        span_direccion_id.classList.remove("span-direccion_error");
      }
      this.direccionEmpy = false;
  }
  direccionBlur(){
    const span_direccion_focus=document.querySelector(".span_direccion_focus");
    if(span_direccion_focus!=null){
      span_direccion_focus.classList.replace("span_direccion_focus","span-direccion");
    }
    const direccion_focus=document.querySelector(".direccion_focus");
    if(direccion_focus!=null){
      direccion_focus.classList.replace("direccion_focus","direccion");
    }
      if(this.usuario.direccion==undefined || this.usuario.direccion==""){
        const span_direccion_focus=document.querySelector(".span_direccion_focus");
        if(span_direccion_focus!=null){
          span_direccion_focus.classList.replace("span_direccion_focus","span-direccion");
        }
        const direccion_focus=document.querySelector(".direccion_focus");
        if(direccion_focus!=null){
          direccion_focus.classList.replace("direccion_focus","direccion");
        }
      }else{
        const span_direccion=document.querySelector(".span-direccion");
        if(span_direccion!=null){
          span_direccion.classList.replace("span-direccion","span_direccion_focus");
        }
        const direccion=document.querySelector(".direccion");
        if(direccion!=null){
          direccion.classList.replace("direccion","direccion_focus");
        }
      }
      const direccion = document.getElementById('direccion');
      const span_direccion=document.getElementById('span_direccion');
      if(!this.usuario.direccion){
        this.direccionInvalid=false
        this.direccionEmpy = true;
        direccion.classList.add('direccion_error');
        span_direccion.classList.add('span-direccion_error');
        return;
      }
      this.direccionEmpy = false;
      this.direccionInvalid = !this.validarDireccion(this.usuario.direccion);
      
      if(this.direccionInvalid){
        direccion.classList.replace('direccion_focus','direccion_focus_error');
        span_direccion.classList.replace('span_direccion_focus','span_direccion_focus_error');
      }
  }
  span_direccionClick(event:MouseEvent){
    if(this.disableInput===false){
    const span_direccion=document.querySelector(".span-direccion");
    if(span_direccion!=null){
      span_direccion.classList.replace("span-direccion","span_direccion_focus");
    }
    const direccion=document.querySelector(".direccion");
    if(direccion!=null){
      direccion.classList.replace("direccion","direccion_focus");
    }
    
    const span_direccion_focus=document.querySelector(".span_direccion_focus");
    if(span_direccion_focus!=null){
      const clickedElement = event.target as HTMLElement;
      if (this.inputDireccion && clickedElement !== this.inputDireccion.nativeElement) {
        this.inputDireccion.nativeElement.focus();
      }
    }
    }
  }

   //Ruc
   handleInputChangeRuc(){
    this.disableSubmitButton=false;
    this.rucInvalid = false;
    this.rucEmpy = false;
    this.rucExiste=false;

    const span_ruc_focus_error=document.querySelector(".span_ruc_focus_error");
    if(span_ruc_focus_error!=null){
      span_ruc_focus_error.classList.replace('span_ruc_focus_error','span_ruc_focus');
    }
    const ruc_focus_error=document.querySelector(".ruc_focus_error");
    if(ruc_focus_error!=null){
      ruc_focus_error.classList.replace('ruc_focus_error','ruc_focus')
    }
   }
   rucFocus(){
    const span_ruc=document.querySelector(".span-ruc");
    if(span_ruc!=null){
      span_ruc.classList.replace("span-ruc","span_ruc_focus");
    }
    const ruc=document.querySelector(".ruc");
    if(ruc!=null){
      ruc.classList.replace("ruc","ruc_focus");
    }
    const span_ruc_id=document.getElementById('span_ruc');
      if(span_ruc_id!=null){
        span_ruc_id.classList.remove("span-ruc_error");
      }
      this.rucEmpy = false;
   }
   rucBlur(){
    const span_ruc_focus=document.querySelector(".span_ruc_focus");
    if(span_ruc_focus!=null){
      span_ruc_focus.classList.replace("span_ruc_focus","span-ruc");
    }
    const ruc_focus=document.querySelector(".ruc_focus");
    if(ruc_focus!=null){
      ruc_focus.classList.replace("ruc_focus","ruc");
    }
      if(this.usuario.ruc==undefined || this.usuario.ruc==""){
        const span_ruc_focus=document.querySelector(".span_ruc_focus");
        if(span_ruc_focus!=null){
          span_ruc_focus.classList.replace("span_ruc_focus","span-ruc");
        }
        const ruc_focus=document.querySelector(".ruc_focus");
        if(ruc_focus!=null){
          ruc_focus.classList.replace("ruc_focus","ruc");
        }
      }else{
        const span_ruc=document.querySelector(".span-ruc");
        if(span_ruc!=null){
          span_ruc.classList.replace("span-ruc","span_ruc_focus");
        }
        const ruc=document.querySelector(".ruc");
        if(ruc!=null){
          ruc.classList.replace("ruc","ruc_focus");
        }
      }

      const ruc = document.getElementById('ruc');
      const span_ruc=document.getElementById('span_ruc');
      if(!this.usuario.ruc){
        this.rucInvalid=false
        this.rucEmpy = true;
        ruc.classList.add('ruc_error');
        span_ruc.classList.add('span-ruc_error');
        return;
      }
      this.rucEmpy = false;
      this.rucInvalid = !this.validarRUC(this.usuario.ruc);
      
      if(this.rucInvalid){
        ruc.classList.replace('ruc_focus','ruc_focus_error');
        span_ruc.classList.replace('span_ruc_focus','span_ruc_focus_error');
      }
   }
   span_rucClick(event:MouseEvent){
    if(this.disableInput===false){
    const span_ruc=document.querySelector(".span-ruc");
    if(span_ruc!=null){
      span_ruc.classList.replace("span-ruc","span_ruc_focus");
    }
    const ruc=document.querySelector(".ruc");
    if(ruc!=null){
      ruc.classList.replace("ruc","ruc_focus");
    }
    
    const span_ruc_focus=document.querySelector(".span_ruc_focus");
    if(span_ruc_focus!=null){
      const clickedElement = event.target as HTMLElement;
      if (this.inputRuc && clickedElement !== this.inputRuc.nativeElement) {
        this.inputRuc.nativeElement.focus();
      }
    }
    } 
   }

   //Razon Social
   handleInputChangeRazonsocial(){
    this.disableSubmitButton=false;
    this.razonsocialInvalid = false;
    this.razonsocialEmpy = false;

    const span_razonsocial_focus_error=document.querySelector(".span_razonsocial_focus_error");
    if(span_razonsocial_focus_error!=null){
      span_razonsocial_focus_error.classList.replace('span_razonsocial_focus_error','span_razonsocial_focus');
    }
    const razonsocial_focus_error=document.querySelector(".razonsocial_focus_error");
    if(razonsocial_focus_error!=null){
      razonsocial_focus_error.classList.replace('razonsocial_focus_error','razonsocial_focus')
    }
   }
   razonsocialFocus(){
    const span_razonsocial=document.querySelector(".span-razonsocial");
    if(span_razonsocial!=null){
      span_razonsocial.classList.replace("span-razonsocial","span_razonsocial_focus");
    }
    const razonsocial=document.querySelector(".razonsocial");
    if(razonsocial!=null){
      razonsocial.classList.replace("razonsocial","razonsocial_focus");
    }
    const span_razonsocial_id=document.getElementById('span_razonsocial');
      if(span_razonsocial_id!=null){
        span_razonsocial_id.classList.remove("span-razonsocial_error");
      }
      this.razonsocialEmpy = false;
   }
   razonsocialBlur(){
    const span_razonsocial_focus=document.querySelector(".span_razonsocial_focus");
    if(span_razonsocial_focus!=null){
      span_razonsocial_focus.classList.replace("span_razonsocial_focus","span-razonsocial");
    }
    const razonsocial_focus=document.querySelector(".razonsocial_focus");
    if(razonsocial_focus!=null){
      razonsocial_focus.classList.replace("razonsocial_focus","razonsocial");
    }
      if(this.usuario.razonSocial==undefined || this.usuario.razonSocial==""){
        const span_razonsocial_focus=document.querySelector(".span_razonsocial_focus");
        if(span_razonsocial_focus!=null){
          span_razonsocial_focus.classList.replace("span_razonsocial_focus","span-razonsocial");
        }
        const razonsocial_focus=document.querySelector(".razonsocial_focus");
        if(razonsocial_focus!=null){
          razonsocial_focus.classList.replace("razonsocial_focus","razonsocial");
        }
      }else{
        const span_razonsocial=document.querySelector(".span-razonsocial");
        if(span_razonsocial!=null){
          span_razonsocial.classList.replace("span-razonsocial","span_razonsocial_focus");
        }
        const razonsocial=document.querySelector(".razonsocial");
        if(razonsocial!=null){
          razonsocial.classList.replace("razonsocial","razonsocial_focus");
        }
      }

      const razonsocial = document.getElementById('razonsocial');
      const span_razonsocial=document.getElementById('span_razonsocial');
      if(!this.usuario.razonSocial){
        this.razonsocialInvalid=false
        this.razonsocialEmpy = true;
        razonsocial.classList.add('razonsocial_error');
        span_razonsocial.classList.add('span-razonsocial_error');
        return;
      }
      this.razonsocialEmpy = false;
      this.razonsocialInvalid = !this.validarRazonsocial(this.usuario.razonSocial);
      
      if(this.razonsocialInvalid){
        razonsocial.classList.replace('razonsocial_focus','razonsocial_focus_error');
        span_razonsocial.classList.replace('span_razonsocial_focus','span_razonsocial_focus_error');
      }
   }
   span_razonsocialClick(event:MouseEvent){
    if(this.disableInput===false){
    const span_razonsocial=document.querySelector(".span-razonsocial");
    if(span_razonsocial!=null){
      span_razonsocial.classList.replace("span-razonsocial","span_razonsocial_focus");
    }
    const razonsocial=document.querySelector(".razonsocial");
    if(razonsocial!=null){
      razonsocial.classList.replace("razonsocial","razonsocial_focus");
    }
    
    const span_razonsocial_focus=document.querySelector(".span_razonsocial_focus");
    if(span_razonsocial_focus!=null){
      const clickedElement = event.target as HTMLElement;
      if (this.inputRazonsocial && clickedElement !== this.inputRazonsocial.nativeElement) {
        this.inputRazonsocial.nativeElement.focus();
      }
    }
    }
   }

   //Actividad Comercial
   handleInputChangeactividadcomercial(){
    this.disableSubmitButton=false;
    this.actividadcomercialInvalid = false;
    this.actividadcomercialEmpy = false;

    const span_actividadcomercial_focus_error=document.querySelector(".span_actividadcomercial_focus_error");
    if(span_actividadcomercial_focus_error!=null){
      span_actividadcomercial_focus_error.classList.replace('span_actividadcomercial_focus_error','span_actividadcomercial_focus');
    }
    const actividadcomercial_focus_error=document.querySelector(".actividadcomercial_focus_error");
    if(actividadcomercial_focus_error!=null){
      actividadcomercial_focus_error.classList.replace('actividadcomercial_focus_error','actividadcomercial_focus')
    }
   }
   actividadcomercialFocus(){
    const span_actividadcomercial=document.querySelector(".span-actividadcomercial");
    if(span_actividadcomercial!=null){
      span_actividadcomercial.classList.replace("span-actividadcomercial","span_actividadcomercial_focus");
    }
    const actividadcomercial=document.querySelector(".actividadcomercial");
    if(actividadcomercial!=null){
      actividadcomercial.classList.replace("actividadcomercial","actividadcomercial_focus");
    }
    const span_actividadcomercial_id=document.getElementById('span_actividadcomercial');
      if(span_actividadcomercial_id!=null){
        span_actividadcomercial_id.classList.remove("span-actividadcomercial_error");
      }
      this.actividadcomercialEmpy = false;
   }
   actividadcomercialBlur(){
    const span_actividadcomercial_focus=document.querySelector(".span_actividadcomercial_focus");
    if(span_actividadcomercial_focus!=null){
      span_actividadcomercial_focus.classList.replace("span_actividadcomercial_focus","span-actividadcomercial");
    }
    const actividadcomercial_focus=document.querySelector(".actividadcomercial_focus");
    if(actividadcomercial_focus!=null){
      actividadcomercial_focus.classList.replace("actividadcomercial_focus","actividadcomercial");
    }
      if(this.usuario.actividadcomercial==undefined || this.usuario.actividadcomercial==""){
        const span_actividadcomercial_focus=document.querySelector(".span_actividadcomercial_focus");
        if(span_actividadcomercial_focus!=null){
          span_actividadcomercial_focus.classList.replace("span_actividadcomercial_focus","span-actividadcomercial");
        }
        const actividadcomercial_focus=document.querySelector(".actividadcomercial_focus");
        if(actividadcomercial_focus!=null){
          actividadcomercial_focus.classList.replace("actividadcomercial_focus","actividadcomercial");
        }
      }else{
        const span_actividadcomercial=document.querySelector(".span-actividadcomercial");
        if(span_actividadcomercial!=null){
          span_actividadcomercial.classList.replace("span-actividadcomercial","span_actividadcomercial_focus");
        }
        const actividadcomercial=document.querySelector(".actividadcomercial");
        if(actividadcomercial!=null){
          actividadcomercial.classList.replace("actividadcomercial","actividadcomercial_focus");
        }
      }

      const actividadcomercial = document.getElementById('actividadcomercial');
      const span_actividadcomercial=document.getElementById('span_actividadcomercial');
      if(!this.usuario.actividadcomercial){
        this.actividadcomercialInvalid=false
        this.actividadcomercialEmpy = true;
        actividadcomercial.classList.add('actividadcomercial_error');
        span_actividadcomercial.classList.add('span-actividadcomercial_error');
        return;
      }
      this.actividadcomercialEmpy = false;
      this.actividadcomercialInvalid = !this.validarActividadComercial(this.usuario.actividadcomercial);
      
      if(this.actividadcomercialInvalid){
        actividadcomercial.classList.replace('actividadcomercial_focus','actividadcomercial_focus_error');
        span_actividadcomercial.classList.replace('span_actividadcomercial_focus','span_actividadcomercial_focus_error');
      }
   }
   span_actividadcomercialClick(event:MouseEvent){
    if(this.disableInput===false){
    const span_actividadcomercial=document.querySelector(".span-actividadcomercial");
    if(span_actividadcomercial!=null){
      span_actividadcomercial.classList.replace("span-actividadcomercial","span_actividadcomercial_focus");
    }
    const actividadcomercial=document.querySelector(".actividadcomercial");
    if(actividadcomercial!=null){
      actividadcomercial.classList.replace("actividadcomercial","actividadcomercial_focus");
    }
    
    const span_actividadcomercial_focus=document.querySelector(".span_actividadcomercial_focus");
    if(span_actividadcomercial_focus!=null){
      const clickedElement = event.target as HTMLElement;
      if (this.inputActividadcomercial && clickedElement !== this.inputActividadcomercial.nativeElement) {
        this.inputActividadcomercial.nativeElement.focus();
      }
    }
    }
   }

   //Descripcion
   handleInputChangedescripcion(){
    this.disableSubmitButton=false;
    this.descripcionInvalid = false;
    this.descripcionEmpy = false;

    const span_descripcion_focus_error=document.querySelector(".span_descripcion_focus_error");
    if(span_descripcion_focus_error!=null){
      span_descripcion_focus_error.classList.replace('span_descripcion_focus_error','span_descripcion_focus');
    }
    const descripcion_focus_error=document.querySelector(".descripcion_focus_error");
    if(descripcion_focus_error!=null){
      descripcion_focus_error.classList.replace('descripcion_focus_error','descripcion_focus')
    }
   }
   descripcionFocus(){
    const span_descripcion=document.querySelector(".span-descripcion");
    if(span_descripcion!=null){
      span_descripcion.classList.replace("span-descripcion","span_descripcion_focus");
    }
    const descripcion=document.querySelector(".descripcion");
    if(descripcion!=null){
      descripcion.classList.replace("descripcion","descripcion_focus");
    }
    const span_descripcion_id=document.getElementById('span_descripcion');
      if(span_descripcion_id!=null){
        span_descripcion_id.classList.remove("span-descripcion_error");
      }
      this.descripcionEmpy = false;
   }
    descripcionBlur(){
    const span_descripcion_focus=document.querySelector(".span_descripcion_focus");
    if(span_descripcion_focus!=null){
      span_descripcion_focus.classList.replace("span_descripcion_focus","span-descripcion");
    }
    const descripcion_focus=document.querySelector(".descripcion_focus");
    if(descripcion_focus!=null){
      descripcion_focus.classList.replace("descripcion_focus","descripcion");
    }
      if(this.usuario.descripcion==undefined || this.usuario.descripcion==""){
        const span_descripcion_focus=document.querySelector(".span_descripcion_focus");
        if(span_descripcion_focus!=null){
          span_descripcion_focus.classList.replace("span_descripcion_focus","span-descripcion");
        }
        const descripcion_focus=document.querySelector(".descripcion_focus");
        if(descripcion_focus!=null){
          descripcion_focus.classList.replace("descripcion_focus","descripcion");
        }
      }else{
        const span_descripcion=document.querySelector(".span-descripcion");
        if(span_descripcion!=null){
          span_descripcion.classList.replace("span-descripcion","span_descripcion_focus");
        }
        const descripcion=document.querySelector(".descripcion");
        if(descripcion!=null){
          descripcion.classList.replace("descripcion","descripcion_focus");
        }
      }

      const descripcion = document.getElementById('descripcion');
      const span_descripcion=document.getElementById('span_descripcion');
      if(!this.usuario.descripcion){
        this.descripcionInvalid=false
        this.descripcionEmpy = true;
        descripcion.classList.add('descripcion_error');
        span_descripcion.classList.add('span-descripcion_error');
        return;
      }
      this.descripcionEmpy = false;
      this.descripcionInvalid = !this.validarDescripcion(this.usuario.descripcion);
      
      if(this.descripcionInvalid){
        descripcion.classList.replace('descripcion_focus','descripcion_focus_error');
        span_descripcion.classList.replace('span_descripcion_focus','span_descripcion_focus_error');
      }
   }
   span_descripcionClick(event:MouseEvent){
    if(this.disableInput===false){
    const span_descripcion=document.querySelector(".span-descripcion");
    if(span_descripcion!=null){
      span_descripcion.classList.replace("span-descripcion","span_descripcion_focus");
    }
    
    const span_descripcion_focus=document.querySelector(".span_descripcion_focus");
    if(span_descripcion_focus!=null){
      const clickedElement = event.target as HTMLElement;
      if (this.inputDescripcion && clickedElement !== this.inputDescripcion.nativeElement) {
        this.inputDescripcion.nativeElement.focus();
      }
    }
    }
   }


   //Telefono
   handleInputChangeTelefono(){
    this.disableSubmitButton=false;
    this.telefonoInvalid = false;
    this.telefonoEmpy = false;
    const span_telefono_focus_error=document.querySelector(".span_telefono_focus_error");
    if(span_telefono_focus_error!=null){
      span_telefono_focus_error.classList.replace('span_telefono_focus_error','span_telefono_focus');
    }
    const telefono_focus_error=document.querySelector(".telefono_focus_error");
    if(telefono_focus_error!=null){
      telefono_focus_error.classList.replace('telefono_focus_error','telefono_focus')
    }
   }
   telefonoFocus(){
    const span_telefono=document.querySelector(".span-telefono");
    if(span_telefono!=null){
      span_telefono.classList.replace("span-telefono","span_telefono_focus");
    }
    const telefono=document.querySelector(".telefono");
    if(telefono!=null){
      telefono.classList.replace("telefono","telefono_focus");
    }
    const span_telefono_id=document.getElementById('span_telefono');
      if(span_telefono_id!=null){
        span_telefono_id.classList.remove("span-telefono_error");
      }
      this.telefonoEmpy = false;
   }
  telefonoBlur(){
    const span_telefono_focus=document.querySelector(".span_telefono_focus");
    if(span_telefono_focus!=null){
      span_telefono_focus.classList.replace("span_telefono_focus","span-telefono");
    }
    const telefono_focus=document.querySelector(".telefono_focus");
    if(telefono_focus!=null){
      telefono_focus.classList.replace("telefono_focus","telefono");
    }
      if(this.usuario.telefono==undefined || this.usuario.telefono==""){
        const span_telefono_focus=document.querySelector(".span_telefono_focus");
        if(span_telefono_focus!=null){
          span_telefono_focus.classList.replace("span_telefono_focus","span-telefono");
        }
        const telefono_focus=document.querySelector(".telefono_focus");
        if(telefono_focus!=null){
          telefono_focus.classList.replace("telefono_focus","telefono");
        }
      }else{
        const span_telefono=document.querySelector(".span-telefono");
        if(span_telefono!=null){
          span_telefono.classList.replace("span-telefono","span_telefono_focus");
        }
        const telefono=document.querySelector(".telefono");
        if(telefono!=null){
          telefono.classList.replace("telefono","telefono_focus");
        }
      }
      const telefono = document.getElementById('telefono');
      const span_telefono=document.getElementById('span_telefono');
      if(!this.usuario.telefono){
        this.telefonoInvalid=false
        this.telefonoEmpy = true;
        telefono.classList.add('telefono_error');
        span_telefono.classList.add('span-telefono_error');
        return;
      }
      this.telefonoEmpy = false;
      this.telefonoInvalid = !this.validarTelefono(this.usuario.telefono);
      
      if(this.telefonoInvalid){
        telefono.classList.replace('telefono_focus','telefono_focus_error');
        span_telefono.classList.replace('span_telefono_focus','span_telefono_focus_error');
      }
   }
   span_telefonoClick(event:MouseEvent){
    if(this.disableInput===false){
    const span_telefono=document.querySelector(".span-telefono");
    if(span_telefono!=null){
      span_telefono.classList.replace("span-telefono","span_telefono_focus");
    }
    const telefono=document.querySelector(".telefono");
    if(telefono!=null){
      telefono.classList.replace("telefono","telefono_focus");
    }
    
    const span_telefono_focus=document.querySelector(".span_telefono_focus");
    if(span_telefono_focus!=null){
      const clickedElement = event.target as HTMLElement;
      if (this.inputTelefono && clickedElement !== this.inputTelefono.nativeElement) {
        this.inputTelefono.nativeElement.focus();
      }
    }
    }
   }

  isEmpty(value: any): boolean {
    return value === "" || value === undefined;
  }
  isNoEmpty(value:any): boolean{
    return value !=="";
  }

   handleClickRegistrar(){
    const data={
          "id":this.usuario.id,
          "nombres":this.usuario.nombres == null ? "" : this.usuario.nombres,
          "apellidoPaterno":this.usuario.apellidoPaterno == undefined ? "": this.usuario.apellidoPaterno,
          "apellidoMaterno":this.usuario.apellidoMaterno == undefined ? "": this.usuario.apellidoMaterno,
          "direccion":this.usuario.direccion,
          "telefono":this.usuario.telefono,
          "ruc":this.usuario.ruc == undefined ? "" : this.usuario.ruc,
          "email":this.usuario.email,
          "contrasena": this.usuario.contrasena,
          "cartera":this.cartera,
          "tiposPerfilesUsuario":this.tiposPerfilesUsuario.length==0 ? [{ id: 1, nombre: "inversionista" }] :[this.tiposPerfilesUsuario],
          "razonSocial":this.usuario.razonSocial == undefined ? "" : this.usuario.razonSocial,
          "actividadcomercial":this.usuario.actividadcomercial == undefined ? "" : this.usuario.actividadcomercial,
          "descripcion":this.usuario.descripcion == undefined ? "": this.usuario.descripcion,
        }

        if(this.perfilInversion==true){
          if((this.usuario.email!==undefined && this.usuario.email !=="" && this.emailInvalid==false) && (this.usuario.contrasena!==undefined && this.usuario.contrasena !== "" && this.passwordInvalid==false) && (this.usuario.nombres!==undefined && this.usuario.nombres !== "" && this.nameInvalid==false) && (this.usuario.apellidoPaterno!==undefined && this.usuario.apellidoPaterno !== "" && this.apellidoPaternoInvalid==false) && (this.usuario.apellidoMaterno!==undefined && this.usuario.apellidoMaterno !== "" && this.apellidoMaternoInvalid==false) && (this.usuario.direccion!==undefined && this.usuario.direccion !== "" && this.direccionInvalid==false)  && (this.usuario.telefono!==undefined && this.usuario.telefono !== "" && this.telefonoInvalid==false)){
            this.autService.register(data).subscribe(
              (response: any) => {
                if(response){
                    this.router.navigate(['inversionista/dashboard']);
                  }
              },
              (error: any) => {
                if(error.error.errores.length==2){
                  this.rucExiste=true;
                  this.emailExiste=true;
                }
                if(error.error.errores=="Ya existe un usuario registrado con este correo electrónico"){
                  this.emailExiste=true;
                }
                if(error.error.errores=="Ya existe un usuario registrado con este Ruc"){
                  this.rucExiste=true;
                }
              }
            )
            
          }
          if(this.usuario.email===undefined || this.usuario.email ==="" ){
            this.emailEmpty=true;
            const correo = document.getElementById('correo');
            correo.classList.add('correo_error');
            const span_correo=document.getElementById('span_correo');
            span_correo.classList.add('span-correo_error');
          }
          if(this.usuario.contrasena===undefined || this.usuario.contrasena === ""){
            this.passwordEmpy=true;
            const contraseña = document.getElementById('contraseña');
            contraseña.classList.add('contraseña_error');
            const span_contraseña=document.getElementById('span_contraseña');
            span_contraseña.classList.add('span-contraseña_error');
          }
          if(this.usuario.nombres===undefined || this.usuario.nombres === ""){
            this.nameEmpy=true;
            const nombre = document.getElementById('nombre');
            nombre.classList.add('nombre_error');
            const span_nombre=document.getElementById('span_nombre');
            span_nombre.classList.add('span-nombre_error');
          }
          if(this.usuario.apellidoPaterno===undefined || this.usuario.apellidoPaterno === ""){
            this.apellidoPaternoEmpy=true;
            const apellidoPaterno = document.getElementById('apellidoPaterno');
            apellidoPaterno.classList.add('apellidoPaterno_error');
            const span_apellidoPaterno=document.getElementById('span_apellidoPaterno');
            span_apellidoPaterno.classList.add('span-apellidoPaterno_error');
          }
          if(this.usuario.apellidoMaterno===undefined || this.usuario.apellidoMaterno === ""){
            this.apellidoMaternoEmpy=true;
            const apellidoMaterno = document.getElementById('apellidoMaterno');
            apellidoMaterno.classList.add('apellidoMaterno_error');
            const span_apellidoMaterno=document.getElementById('span_apellidoMaterno');
            span_apellidoMaterno.classList.add('span-apellidoMaterno_error');
          }
          if(this.usuario.direccion===undefined || this.usuario.direccion === ""){
            this.direccionEmpy=true;
            const direccion = document.getElementById('direccion');
            direccion.classList.add('direccion_error');
            const span_direccion=document.getElementById('span_direccion');
            span_direccion.classList.add('span-direccion_error');
          }
          if(this.usuario.telefono===undefined || this.usuario.telefono === ""){
            this.telefonoEmpy=true;
            const telefono = document.getElementById('telefono');
            telefono.classList.add('telefono_error');
            const span_telefono=document.getElementById('span_telefono');
            span_telefono.classList.add('span-telefono_error');
          }
        }
        if(this.perfilEmpresa==true){
          if((this.usuario.email!==undefined && this.usuario.email !=="" && this.emailInvalid==false) && (this.usuario.contrasena!==undefined && this.usuario.contrasena !== "" && this.passwordInvalid==false)  && (this.usuario.direccion!==undefined && this.usuario.direccion !== "" && this.direccionInvalid==false) && (this.usuario.ruc!==undefined && this.usuario.ruc !== "" && this.rucInvalid==false) && (this.usuario.telefono!==undefined && this.usuario.telefono !== "" && this.telefonoInvalid==false)){
                  this.autService.register(data).subscribe(
                    (response: any) => {
                      if(response){
                        this.router.navigate(['empresa/dashboard']);
                        }
                    },
                    (error: any) => {
                      console.log(error);
                      if(error.error.errores.length==2){
                        this.rucExiste=true;
                        this.emailExiste=true;
                      }
                      if(error.error.errores=="Ya existe un usuario registrado con este correo electrónico"){
                        this.emailExiste=true;
                      }
                      if(error.error.errores=="Ya existe un usuario registrado con este Ruc"){
                        this.rucExiste=true;
                      }
                    }
                  )
                
              }
              if(this.usuario.email===undefined || this.usuario.email ==="" ){
                this.emailEmpty=true;
                const correo = document.getElementById('correo');
                  correo.classList.add('correo_error');
                  const span_correo=document.getElementById('span_correo');
                  span_correo.classList.add('span-correo_error');
              }
              if(this.usuario.contrasena===undefined || this.usuario.contrasena === ""){
                this.passwordEmpy=true;
                const contraseña = document.getElementById('contraseña');
                contraseña.classList.add('contraseña_error');
                const span_contraseña=document.getElementById('span_contraseña');
                span_contraseña.classList.add('span-contraseña_error');
              }
              if(this.usuario.direccion===undefined || this.usuario.direccion === ""){
                this.direccionEmpy=true;
                const direccion = document.getElementById('direccion');
                  direccion.classList.add('direccion_error');
                  const span_direccion=document.getElementById('span_direccion');
                  span_direccion.classList.add('span-direccion_error');
              }
              if(this.usuario.ruc===undefined || this.usuario.ruc === ""){
                this.rucEmpy=true;
                const ruc = document.getElementById('ruc');
                  ruc.classList.add('ruc_error');
                  const span_ruc=document.getElementById('span_ruc');
                  span_ruc.classList.add('span-ruc_error');
              }
              if(this.usuario.razonSocial===undefined || this.usuario.razonSocial === ""){
                this.razonsocialEmpy=true;
                const razonsocial = document.getElementById('razonsocial');
                  razonsocial.classList.add('razonsocial_error');
                  const span_razonsocial=document.getElementById('span_razonsocial');
                  span_razonsocial.classList.add('span-razonsocial_error');
              }
              if(this.usuario.actividadcomercial===undefined || this.usuario.actividadcomercial === ""){
                this.actividadcomercialEmpy=true;
                const actividadcomercial = document.getElementById('actividadcomercial');
                  actividadcomercial.classList.add('actividadcomercial_error');
                  const span_actividadcomercial=document.getElementById('span_actividadcomercial');
                  span_actividadcomercial.classList.add('span-actividadcomercial_error');
              }
              if(this.usuario.descripcion===undefined || this.usuario.descripcion === ""){
                this.descripcionEmpy=true;
                const descripcion = document.getElementById('descripcion');
                  descripcion.classList.add('descripcion_error');
                  const span_descripcion=document.getElementById('span_descripcion');
                  span_descripcion.classList.add('span-descripcion_error');
              }
              if(this.usuario.telefono===undefined || this.usuario.telefono === ""){
                this.telefonoEmpy=true;
                const telefono = document.getElementById('telefono');
                  telefono.classList.add('telefono_error');
                  const span_telefono=document.getElementById('span_telefono');
                  span_telefono.classList.add('span-telefono_error');
              }
        }
  }

  redirectLogin(){
    this.router.navigate(['/']);
  }

  redireccionarIniciarSesion(){
    this.router.navigate(['/login']);
  }
}
