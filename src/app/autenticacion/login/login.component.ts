import { Component, OnInit, Renderer2, ElementRef , ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { Observable, map } from 'rxjs';
import { AuthService } from "src/app/services/AuthService.service";
import { Usuario } from "src/app/usuario";
import { UsuarioService } from "src/app/usuario.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('inputCorreo') inputCorreo!: ElementRef<HTMLInputElement>;
  @ViewChild('inputContraseña') inputContraseña!: ElementRef<HTMLInputElement>;
  imageSrc = 'assets/imagenes/imagen_fondo.jpg';
  imageSrcLogo = 'assets/imagenes/logo2.png';
  imageSrcLogo2 = 'assets/imagenes/logo.png';
  span_correo:false;
  inputValue = '';
  isFocused = false; // Define la propiedad isFocused en false
  usuario: Usuario = new Usuario();
  disableSubmitButton = true;
  emailInvalid: boolean = false;
  emailEmpty: boolean = false;
  emailExiste: boolean = false;
  passwordEmpy: boolean = false;
  passwordInvalid: boolean = false;

  constructor(private usuarioService: UsuarioService,private autService: AuthService, private router: Router, private formBuilder: FormBuilder,private renderer: Renderer2, private el: ElementRef) { }
  ngOnInit() {

  }
  

  //OnChange para Email
  handleInputChangeEmail() {
    this.disableSubmitButton=false;
      
    const span_correo_focus_error=document.querySelector(".span_correo_focus_error");
    if(span_correo_focus_error!=null){
      span_correo_focus_error.classList.replace('span_correo_focus_error','span_correo_focus');
    }
    const correo_focus_error=document.querySelector(".correo_focus_error");
    if(correo_focus_error!=null){
      correo_focus_error.classList.replace('correo_focus_error','correo_focus')
    }
    
    this.emailInvalid = false;
    this.emailExiste=false;

  }
  //Validar Email
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  correoBlur() {
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
      correo.classList.add('correo_error');
      span_correo.classList.add('span-correo_error');
      return;
    }
    this.emailEmpty = false;
    this.emailInvalid = !this.validateEmail(this.usuario.email);
    if(this.emailInvalid){
      correo.classList.replace('correo_focus','correo_focus_error');
      span_correo.classList.replace('span_correo_focus','span_correo_focus_error');
    }
  }
  

  //Focus
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

  //Span_correo_click
  span_correoClick(event: MouseEvent){
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
 

  //OnChange para Password
  handleInputChangePassword(){
    this.disableSubmitButton=false;
    this.passwordInvalid = false;
    const span_contraseña_focus_error=document.querySelector(".span_contraseña_focus_error");
    if(span_contraseña_focus_error!=null){
      span_contraseña_focus_error.classList.replace('span_contraseña_focus_error','span_contraseña_focus');
    }
    const contraseña_focus_error=document.querySelector(".contraseña_focus_error");
    if(contraseña_focus_error!=null){
      contraseña_focus_error.classList.replace('contraseña_focus_error','contraseña_focus');
    }
  }
  //FOCUS
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
  }

  span_contrasenaClick(event: MouseEvent){
    const span_contraseña=document.querySelector(".span-contraseña");
    if(span_contraseña!=null){
      span_contraseña.classList.replace("span-contraseña","span_contraseña_focus");
    }
    const contraseña=document.querySelector(".contraseña");
    if(contraseña!=null){
      contraseña.classList.replace("contraseña","contraseña_focus");
    }
  

    const span_contraseña_focus=document.querySelector(".span_contraseña_focus");
    // console.log(span_correo_focus);
    if(span_contraseña_focus!=null){
      const clickedElement = event.target as HTMLElement;
      if (this.inputContraseña && clickedElement !== this.inputContraseña.nativeElement) {
        this.inputContraseña.nativeElement.focus();
      }
    }
  }

  clickVisibility(){
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

  clickNoVisibility(){
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



  // Compara la password hasheada
  comparePasswords(enteredPassword: string, hashedPassword: string) {
    return bcrypt.compareSync(enteredPassword, hashedPassword);
  }

  //Iniciar Sesion
  handleClickIniciarSesion() {
    if((this.usuario.email=="" || this.usuario.email==undefined) && (this.usuario.contrasena=="" || this.usuario.contrasena==undefined)){
      if(this.emailEmpty==false && this.passwordEmpy==false){
        this.emailEmpty=true;
        this.passwordEmpy=true;
      }
    }
    else if(this.usuario.email=="" || this.usuario.email==undefined){
      const correo = document.getElementById('correo');
      const span_correo=document.getElementById('span_correo');
      if(!this.usuario.email){
        this.emailInvalid = false;
        this.emailEmpty = true;
        correo.classList.add('correo_error');
        span_correo.classList.add('span-correo_error');
        return;
      }
    }else if(this.usuario.contrasena=="" || this.usuario.contrasena==undefined){
      const contraseña = document.getElementById('contraseña');
      const span_contraseña=document.getElementById('span_contraseña');
      if(!this.usuario.contrasena){
        this.passwordInvalid = false;
        this.passwordEmpy = true;
        contraseña.classList.add('contraseña_error');
        span_contraseña.classList.add('span-contraseña_error');
        return;
      }
    }else{
      this.emailInvalid = !this.validateEmail(this.usuario.email);
      if(!this.emailInvalid){
        this.usuarioService.listarUsuarioPorCorreo(this.usuario.email).subscribe((res: any) => {
          if(this.comparePasswords(this.usuario.contrasena, res[0].contrasena)){
                  this.autService.login(this.usuario);
                }else{
                  this.passwordInvalid=true;
                  const contraseña_focus = document.querySelector('.contraseña_focus');
                  const span_contraseña_focus=document.querySelector('.span_contraseña_focus');
                    if(contraseña_focus!=null){
                      contraseña_focus.classList.replace('contraseña_focus','contraseña_focus_error');
                    }
                    if(span_contraseña_focus!=null){
                      span_contraseña_focus.classList.replace('span_contraseña_focus','span_contraseña_focus_error');
                    }
                }
        },error=>{
          this.emailExiste=true;
          const correo_focus = document.querySelector('.correo_focus');
          const span_correo_focus=document.querySelector('.span_correo_focus');
            if(correo_focus!=null){
              correo_focus.classList.replace('correo_focus','correo_focus_error');
            }
            if(span_correo_focus!=null){
              span_correo_focus.classList.replace('span_correo_focus','span_correo_focus_error');
            }
        })
      }
    }
  }
  redireccionarRegistro(): void {
    this.router.navigate(['registrar-usuario']);
  }
  redireccionarDashboard():void {
    this.router.navigate(['usuarios']);
  }
}
