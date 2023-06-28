import { Component, OnInit, Renderer2, ElementRef , ViewChild } from '@angular/core';
import { Usuario } from '../usuario';
import { AuthService } from '../services/AuthService.service';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-cuentaUsuario',
    templateUrl: './cuentaUsuario.component.html',
    styleUrls: ['./cuentaUsuario.component.css']
  })
  export class CuentaUsuarioComponente implements OnInit {

    usuario: Usuario = new Usuario();
    usuarioActual: Usuario= new Usuario();
    authService: AuthService;
    tipoUsuario="";
    
    constructor(private auth: AuthService, private usuarioSercice:UsuarioService,private router: Router,private location: Location) { 
      this.authService=auth;
    // Suscribirse al observable currentUser del servicio de AuthService
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.tipoUsuario = user[0].tiposPerfilesUsuario[0].nombre;
        this.usuario = user[0];
        this.usuarioActual=user[0];
      } else {
        this.tipoUsuario = '';
        this.usuario = null;
        this.usuarioActual=null;
      }
    });
    }

  ngOnInit() {

  }

  // Nombre
  editar_nombre:boolean=true;
  cancelar_nombre:boolean= false;
  nameEmpy:boolean=false;
  nameInvalid:boolean=false;
  nombre:string='';

  // Apellido Paterno
  editar_apellidoPaterno:boolean=true;
  cancelar_apellidoPaterno:boolean= false;
  apellidoPaternoEmpy:boolean=false;
  apellidoPaternoInvalid:boolean=false;
  apellidoPaterno:string='';

  // Apellido Materno
  editar_apellidoMaterno:boolean=true;
  cancelar_apellidoMaterno:boolean= false;
  apellidoMaternoEmpy:boolean=false;
  apellidoMaternoInvalid:boolean=false;
  apellidoMaterno:string='';

  // Correo
  editar_correo:boolean=true;
  cancelar_correo:boolean= false;
  correoEmpy:boolean=false;
  correoInvalid:boolean=false;
  emailExiste:boolean=false;
  correo:string='';

  // Direccion
  editar_direccion:boolean=true;
  cancelar_direccion:boolean= false;
  direccionEmpy:boolean=false;
  direccionInvalid:boolean=false;
  direccion:string='';

  //Celular
  editar_celular:boolean=true;
  cancelar_celular:boolean= false;
  celularEmpy:boolean=false;
  celularInvalid:boolean=false;
  celular:string='';

  // Razon Social
  editar_razonSocial:boolean=true;
  cancelar_razonSocial:boolean= false;
  razonSocialEmpy:boolean=false;
  razonSocialInvalid:boolean=false;
  razonSocial:string='';

  // Actividad Comercial
  editar_actividadComercial:boolean=true;
  cancelar_actividadComercial:boolean= false;
  actividadComercialEmpy:boolean=false;
  actividadComercialInvalid:boolean=false;
  actividadComercial:string='';

  // Ruc
  editar_ruc:boolean=true;
  cancelar_ruc:boolean= false;
  rucEmpy:boolean=false;
  rucInvalid:boolean=false;
  ruc:string='';
  rucExiste:boolean=false;

  // Descripcion
  editar_descripcion:boolean=true;
  cancelar_descripcion:boolean= false;
  descripcionEmpy:boolean=false;
  descripcionInvalid:boolean=false;
  descripcion:string='';

  //Validaciones
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
  //Validar Email
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
  //Validar Direccion 
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

  validarDescripcion(descripcion:string){
    // const expresion= 
    return true;
  }


  //Nombre
  handleClickEditarNombre(){
    this.editar_nombre=false;
    this.cancelar_nombre=true;
  }
  handleClickGuardarNombre(){
    if(this.nameInvalid == true){
      const nombre=document.querySelector("#nombre");
      nombre.classList.replace('nombre','nombre_error');
      nombre.classList.replace('nombre_focus','nombre_error');
      return;
    }
    else if(this.nameEmpy == true){
      const nombre=document.querySelector("#nombre");
      nombre.classList.replace('nombre','nombre_error');
      nombre.classList.replace('nombre_focus','nombre_error');
      return;
    }else{
    this.usuarioSercice.actualizarUsuario(this.usuario, this.usuario.id).subscribe(res =>{
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser=res;
      localStorage.setItem('currentUser', JSON.stringify([currentUser]));
      this.editar_nombre=true;
      this.cancelar_nombre=false;
    }, error => console.log(error));
    }
  }
  handleClickCancelarNombre(){
    this.usuarioSercice.obtenerUsuarioPorId(this.usuario.id).subscribe((res:any)=>{
      this.usuario.nombres=res.nombres;
      this.editar_nombre=true;
      this.cancelar_nombre=false;
    })
    this.nameEmpy=false;
    this.nameInvalid=false;
  }
  handleInputChangeNombre(){
    this.nameInvalid = !this.validarNombre(this.usuario.nombres);
    const nombre=document.querySelector("#nombre");
    nombre.classList.replace("nombre","nombre_focus")
    nombre.classList.replace('nombre_error','nombre_focus');
    nombre.classList.replace('nombre_error','nombre');
    
    if(this.usuario.nombres==""){
      nombre.classList.replace('nombre','nombre_error');
      nombre.classList.replace('nombre_focus','nombre_error');
      this.nameInvalid=false;
      this.nameEmpy=true;
    }

    if(this.usuario.nombres!=""){
      if(this.nameInvalid==true){
        nombre.classList.replace('nombre','nombre_error');
        nombre.classList.replace('nombre_focus','nombre_error');
        this.nameEmpy=false;
      }
      if(this.nameEmpy==true){
        this.nameEmpy=false;
      }
    }
  }
  NombreFocus(){
    this.nameEmpy = false;
    this.nameInvalid=false
    const nombre=document.querySelector("#nombre");
    nombre.classList.replace('nombre_error','nombre_focus');
  }
  NombreBlur(){
    const nombre=document.querySelector("#nombre");
    if(!this.usuario.nombres){
      this.nameInvalid=false
      this.nameEmpy = true;
      nombre.classList.replace('nombre','nombre_error');
      nombre.classList.replace('nombre_focus','nombre_error');
      return;
    }
    this.nameEmpy = false;
    this.nameInvalid = !this.validarNombre(this.usuario.nombres);

    if(this.nameInvalid == true){
      const nombre=document.querySelector("#nombre");
      nombre.classList.replace('nombre','nombre_error');
      nombre.classList.replace('nombre_focus','nombre_error');
      return;
    }
  }
  
  
  //Apellido Paterno
  handleClickEditarApellidoPaterno(){
    this.editar_apellidoPaterno=false;
    this.cancelar_apellidoPaterno=true;
  }
  handleClickGuardarapellidoPaterno(){
    if(this.apellidoPaternoInvalid == true){
      const apellidoPaterno=document.querySelector("#apellidoPaterno");
      apellidoPaterno.classList.replace('apellidoPaterno','apellidoPaterno_error');
      apellidoPaterno.classList.replace('apellidoPaterno_focus','apellidoPaterno_error');
      return;
    }
    else if(this.apellidoPaternoEmpy == true){
      const apellidoPaterno=document.querySelector("#apellidoPaterno");
      apellidoPaterno.classList.replace('apellidoPaterno','apellidoPaterno_error');
      apellidoPaterno.classList.replace('apellidoPaterno_focus','apellidoPaterno_error');
      return;
    }else{
    this.usuarioSercice.actualizarUsuario(this.usuario, this.usuario.id).subscribe(res =>{
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser=res;
      localStorage.setItem('currentUser', JSON.stringify([currentUser]));
      this.editar_apellidoPaterno=true;
      this.cancelar_apellidoPaterno=false;
    }, error => console.log(error));
    }
  }
  handleClickCancelarapellidoPaterno(){
    this.usuarioSercice.obtenerUsuarioPorId(this.usuario.id).subscribe((res:any)=>{
      this.usuario.apellidoPaterno=res.apellidoPaterno;
      this.editar_apellidoPaterno=true;
      this.cancelar_apellidoPaterno=false;
    })
    this.apellidoPaternoEmpy=false;
    this.apellidoPaternoInvalid=false;
  }
  handleInputChangeapellidoPaterno(){
    this.apellidoPaternoInvalid = !this.validarApellido(this.usuario.apellidoPaterno);
    const apellidoPaterno=document.querySelector("#apellidoPaterno");
    apellidoPaterno.classList.replace("apellidoPaterno","apellidoPaterno_focus")
    apellidoPaterno.classList.replace('apellidoPaterno_error','apellidoPaterno_focus');
    apellidoPaterno.classList.replace('apellidoPaterno_error','apellidoPaterno');
    
    if(this.usuario.apellidoPaterno==""){
      apellidoPaterno.classList.replace('apellidoPaterno','apellidoPaterno_error');
      apellidoPaterno.classList.replace('apellidoPaterno_focus','apellidoPaterno_error');
      this.apellidoPaternoInvalid=false;
      this.apellidoPaternoEmpy=true;
    }

    if(this.usuario.apellidoPaterno!=""){
      if(this.apellidoPaternoInvalid==true){
        apellidoPaterno.classList.replace('apellidoPaterno','apellidoPaterno_error');
        apellidoPaterno.classList.replace('apellidoPaterno_focus','apellidoPaterno_error');
        this.apellidoPaternoEmpy=false;
      }
      if(this.apellidoPaternoEmpy==true){
        this.apellidoPaternoEmpy=false;
      }
    }
  }
  apellidoPaternoFocus(){
    this.apellidoPaternoEmpy = false;
    this.apellidoPaternoInvalid=false
    const apellidoPaterno=document.querySelector("#apellidoPaterno");
    apellidoPaterno.classList.replace('apellidoPaterno_error','apellidoPaterno_focus');
  }
  apellidoPaternoBlur(){
    const apellidoPaterno=document.querySelector("#apellidoPaterno");
    if(!this.usuario.apellidoPaterno){
      this.apellidoPaternoInvalid=false
      this.apellidoPaternoEmpy = true;
      apellidoPaterno.classList.replace('apellidoPaterno','apellidoPaterno_error');
      apellidoPaterno.classList.replace('apellidoPaterno_focus','apellidoPaterno_error');
      return;
    }
    this.apellidoPaternoEmpy = false;
    this.apellidoPaternoInvalid = !this.validarApellido(this.usuario.apellidoPaterno);

    if(this.apellidoPaternoInvalid == true){
      const apellidoPaterno=document.querySelector("#apellidoPaterno");
      apellidoPaterno.classList.replace('apellidoPaterno','apellidoPaterno_error');
      apellidoPaterno.classList.replace('apellidoPaterno_focus','apellidoPaterno_error');
      return;
    }
  }

  // Apellido Materno
  handleClickEditarApellidoMaterno(){
    this.editar_apellidoMaterno=false;
    this.cancelar_apellidoMaterno=true;
  }
  handleClickGuardarapellidoMaterno(){
    if(this.apellidoMaternoInvalid == true){
      const apellidoMaterno=document.querySelector("#apellidoMaterno");
      apellidoMaterno.classList.replace('apellidoMaterno','apellidoMaterno_error');
      apellidoMaterno.classList.replace('apellidoMaterno_focus','apellidoMaterno_error');
      return;
    }
    else if(this.apellidoMaternoEmpy == true){
      const apellidoMaterno=document.querySelector("#apellidoMaterno");
      apellidoMaterno.classList.replace('apellidoMaterno','apellidoMaterno_error');
      apellidoMaterno.classList.replace('apellidoMaterno_focus','apellidoMaterno_error');
      return;
    }else{
    this.usuarioSercice.actualizarUsuario(this.usuario, this.usuario.id).subscribe(res =>{
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser=res;
      localStorage.setItem('currentUser', JSON.stringify([currentUser]));
      this.editar_apellidoMaterno=true;
      this.cancelar_apellidoMaterno=false;
    }, error => console.log(error));
    }
  }
  handleClickCancelarapellidoMaterno(){
    this.usuarioSercice.obtenerUsuarioPorId(this.usuario.id).subscribe((res:any)=>{
      this.usuario.apellidoMaterno=res.apellidoMaterno;
      this.editar_apellidoMaterno=true;
      this.cancelar_apellidoMaterno=false;
    })
    this.apellidoMaternoEmpy=false;
    this.apellidoMaternoInvalid=false;
  }
  handleInputChangeapellidoMaterno(){
    this.apellidoMaternoInvalid = !this.validarApellido(this.usuario.apellidoMaterno);
    const apellidoMaterno=document.querySelector("#apellidoMaterno");
    apellidoMaterno.classList.replace("apellidoMaterno","apellidoMaterno_focus")
    apellidoMaterno.classList.replace('apellidoMaterno_error','apellidoMaterno_focus');
    apellidoMaterno.classList.replace('apellidoMaterno_error','apellidoMaterno');
    
    if(this.usuario.apellidoMaterno==""){
      apellidoMaterno.classList.replace('apellidoMaterno','apellidoMaterno_error');
      apellidoMaterno.classList.replace('apellidoMaterno_focus','apellidoMaterno_error');
      this.apellidoMaternoInvalid=false;
      this.apellidoMaternoEmpy=true;
    }

    if(this.usuario.apellidoMaterno!=""){
      if(this.apellidoMaternoInvalid==true){
        apellidoMaterno.classList.replace('apellidoMaterno','apellidoMaterno_error');
        apellidoMaterno.classList.replace('apellidoMaterno_focus','apellidoMaterno_error');
        this.apellidoMaternoEmpy=false;
      }
      if(this.apellidoMaternoEmpy==true){
        this.apellidoMaternoEmpy=false;
      }
    }
  }
  apellidoMaternoFocus(){
    this.apellidoMaternoEmpy = false;
    this.apellidoMaternoInvalid=false
    const apellidoMaterno=document.querySelector("#apellidoMaterno");
    apellidoMaterno.classList.replace('apellidoMaterno_error','apellidoMaterno_focus');
  }
  apellidoMaternoBlur(){
    const apellidoMaterno=document.querySelector("#apellidoMaterno");
    if(!this.usuario.apellidoMaterno){
      this.apellidoMaternoInvalid=false
      this.apellidoMaternoEmpy = true;
      apellidoMaterno.classList.replace('apellidoMaterno','apellidoMaterno_error');
      apellidoMaterno.classList.replace('apellidoMaterno_focus','apellidoMaterno_error');
      return;
    }
    this.apellidoMaternoEmpy = false;
    this.apellidoMaternoInvalid = !this.validarApellido(this.usuario.apellidoMaterno);

    if(this.apellidoMaternoInvalid == true){
      const apellidoMaterno=document.querySelector("#apellidoMaterno");
      apellidoMaterno.classList.replace('apellidoMaterno','apellidoMaterno_error');
      apellidoMaterno.classList.replace('apellidoMaterno_focus','apellidoMaterno_error');
      return;
    }
  }

  // Correo
  handleClickEditarcorreo(){
    this.editar_correo=false;
    this.cancelar_correo=true;
  }
  handleClickGuardarcorreo(){
    if(this.correoInvalid == true){
      const correo=document.querySelector("#correo");
      correo.classList.replace('correo','correo_error');
      correo.classList.replace('correo_focus','correo_error');
      return;
    }
    else if(this.correoEmpy == true){
      const correo=document.querySelector("#correo");
      correo.classList.replace('correo','correo_error');
      correo.classList.replace('correo_focus','correo_error');
      return;
    }else{
    this.usuarioSercice.actualizarUsuario(this.usuario, this.usuario.id).subscribe(res =>{
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser=res;
      localStorage.setItem('currentUser', JSON.stringify([currentUser]));
      this.editar_correo=true;
      this.cancelar_correo=false;
    }, error => {
      this.emailExiste=true;
      this.correoEmpy=false;
      this.correoInvalid=false;
      const correo=document.querySelector("#correo");
      correo.classList.replace('correo','correo_error');
      correo.classList.replace('correo_focus','correo_error');
    });
    }
  }
  handleClickCancelarcorreo(){
    this.usuarioSercice.obtenerUsuarioPorId(this.usuario.id).subscribe((res:any)=>{
      this.usuario.email=res.email;
      this.editar_correo=true;
      this.cancelar_correo=false;
    })
    this.correoEmpy=false;
    this.correoInvalid=false;
    this.emailExiste=false;
  }
  handleInputChangecorreo(){
    this.emailExiste=false;
    this.correoInvalid = !this.validateEmail(this.usuario.email);
    const correo=document.querySelector("#correo");
    correo.classList.replace("correo","correo_focus")
    correo.classList.replace('correo_error','correo_focus');
    correo.classList.replace('correo_error','correo');
    
    if(this.usuario.email==""){
      correo.classList.replace('correo','correo_error');
      correo.classList.replace('correo_focus','correo_error');
      this.correoInvalid=false;
      this.correoEmpy=true;
    }

    if(this.usuario.email!=""){
      if(this.correoInvalid==true){
        correo.classList.replace('correo','correo_error');
        correo.classList.replace('correo_focus','correo_error');
        this.correoEmpy=false;
      }
      if(this.correoEmpy==true){
        this.correoEmpy=false;
      }
    }
  }
  correoFocus(){
    this.correoEmpy = false;
    this.correoInvalid=false;
    this.emailExiste=false;
    const correo=document.querySelector("#correo");
    correo.classList.replace('correo_error','correo_focus');
  }
  correoBlur(){
    this.emailExiste=false;
    const correo=document.querySelector("#correo");
    if(!this.usuario.email){
      this.correoInvalid=false
      this.correoEmpy = true;
      correo.classList.replace('correo','correo_error');
      correo.classList.replace('correo_focus','correo_error');
      return;
    }
    this.correoEmpy = false;
    this.correoInvalid = !this.validateEmail(this.usuario.email);

    if(this.correoInvalid == true){
      const correo=document.querySelector("#correo");
      correo.classList.replace('correo','correo_error');
      correo.classList.replace('correo_focus','correo_error');
      return;
    }
  }

  // Direccion
  handleClickEditardireccion(){
    this.editar_direccion=false;
    this.cancelar_direccion=true;
  }
  handleClickGuardardireccion(){
    if(this.direccionInvalid == true){
      const direccion=document.querySelector("#direccion");
      direccion.classList.replace('direccion','direccion_error');
      direccion.classList.replace('direccion_focus','direccion_error');
      return;
    }
    else if(this.direccionEmpy == true){
      const direccion=document.querySelector("#direccion");
      direccion.classList.replace('direccion','direccion_error');
      direccion.classList.replace('direccion_focus','direccion_error');
      return;
    }else{
    this.usuarioSercice.actualizarUsuario(this.usuario, this.usuario.id).subscribe(res =>{
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser=res;
      localStorage.setItem('currentUser', JSON.stringify([currentUser]));
      this.editar_direccion=true;
      this.cancelar_direccion=false;
    }, error => console.log(error));
    }
  }
  handleClickCancelardireccion(){
    this.usuarioSercice.obtenerUsuarioPorId(this.usuario.id).subscribe((res:any)=>{
      this.usuario.direccion=res.direccion;
      this.editar_direccion=true;
      this.cancelar_direccion=false;
    })
    this.direccionEmpy=false;
    this.direccionInvalid=false;
  }
  handleInputChangedireccion(){
    this.direccionInvalid = !this.validarDireccion(this.usuario.direccion);
    const direccion=document.querySelector("#direccion");
    direccion.classList.replace("direccion","direccion_focus")
    direccion.classList.replace('direccion_error','direccion_focus');
    direccion.classList.replace('direccion_error','direccion');
    
    if(this.usuario.direccion==""){
      direccion.classList.replace('direccion','direccion_error');
      direccion.classList.replace('direccion_focus','direccion_error');
      this.direccionInvalid=false;
      this.direccionEmpy=true;
    }

    if(this.usuario.direccion!=""){
      if(this.direccionInvalid==true){
        direccion.classList.replace('direccion','direccion_error');
        direccion.classList.replace('direccion_focus','direccion_error');
        this.direccionEmpy=false;
      }
      if(this.direccionEmpy==true){
        this.direccionEmpy=false;
      }
    }
  }
  direccionFocus(){
    this.direccionEmpy = false;
    this.direccionInvalid=false
    const direccion=document.querySelector("#direccion");
    direccion.classList.replace('direccion_error','direccion_focus');
  }
  direccionBlur(){
    const direccion=document.querySelector("#direccion");
    if(!this.usuario.direccion){
      this.direccionInvalid=false
      this.direccionEmpy = true;
      direccion.classList.replace('direccion','direccion_error');
      direccion.classList.replace('direccion_focus','direccion_error');
      return;
    }
    this.direccionEmpy = false;
    this.direccionInvalid = !this.validarDireccion(this.usuario.direccion);

    if(this.direccionInvalid == true){
      const direccion=document.querySelector("#direccion");
      direccion.classList.replace('direccion','direccion_error');
      direccion.classList.replace('direccion_focus','direccion_error');
      return;
    }
  }

  // Celular
  handleClickEditarcelular(){
    this.editar_celular=false;
    this.cancelar_celular=true;
  }
  handleClickGuardarcelular(){
    if(this.celularInvalid == true){
      const celular=document.querySelector("#celular");
      celular.classList.replace('celular','celular_error');
      celular.classList.replace('celular_focus','celular_error');
      return;
    }
    else if(this.celularEmpy == true){
      const celular=document.querySelector("#celular");
      celular.classList.replace('celular','celular_error');
      celular.classList.replace('celular_focus','celular_error');
      return;
    }else{
    this.usuarioSercice.actualizarUsuario(this.usuario, this.usuario.id).subscribe(res =>{
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser=res;
      localStorage.setItem('currentUser', JSON.stringify([currentUser]));
      this.editar_celular=true;
      this.cancelar_celular=false;
    }, error => console.log(error));
    }
  }
  handleClickCancelarcelular(){
    this.usuarioSercice.obtenerUsuarioPorId(this.usuario.id).subscribe((res:any)=>{
      this.usuario.telefono=res.telefono;
      this.editar_celular=true;
      this.cancelar_celular=false;
    })
    this.celularEmpy=false;
    this.celularInvalid=false;
  }
  handleInputChangecelular(){
    this.celularInvalid = !this.validarTelefono(this.usuario.telefono);
    const celular=document.querySelector("#celular");
    celular.classList.replace("celular","celular_focus")
    celular.classList.replace('celular_error','celular_focus');
    celular.classList.replace('celular_error','celular');
    
    if(this.usuario.telefono==""){
      celular.classList.replace('celular','celular_error');
      celular.classList.replace('celular_focus','celular_error');
      this.celularInvalid=false;
      this.celularEmpy=true;
    }

    if(this.usuario.telefono!=""){
      if(this.celularInvalid==true){
        celular.classList.replace('celular','celular_error');
        celular.classList.replace('celular_focus','celular_error');
        this.celularEmpy=false;
      }
      if(this.celularEmpy==true){
        this.celularEmpy=false;
      }
    }
  }
  celularFocus(){
    this.celularEmpy = false;
    this.celularInvalid=false
    const celular=document.querySelector("#celular");
    celular.classList.replace('celular_error','celular_focus');
  }
  celularBlur(){
    const celular=document.querySelector("#celular");
    if(!this.usuario.telefono){
      this.celularInvalid=false
      this.celularEmpy = true;
      celular.classList.replace('celular','celular_error');
      celular.classList.replace('celular_focus','celular_error');
      return;
    }
    this.celularEmpy = false;
    this.celularInvalid = !this.validarTelefono(this.usuario.telefono);

    if(this.celularInvalid == true){
      const celular=document.querySelector("#celular");
      celular.classList.replace('celular','celular_error');
      celular.classList.replace('celular_focus','celular_error');
      return;
    }
  }

  // Razon Social
  handleClickEditarrazonSocial(){
    this.editar_razonSocial=false;
    this.cancelar_razonSocial=true;
  }
  handleClickGuardarrazonSocial(){
    if(this.razonSocialInvalid == true){
      const razonSocial=document.querySelector("#razonSocial");
      razonSocial.classList.replace('razonSocial','razonSocial_error');
      razonSocial.classList.replace('razonSocial_focus','razonSocial_error');
      return;
    }
    else if(this.razonSocialEmpy == true){
      const razonSocial=document.querySelector("#razonSocial");
      razonSocial.classList.replace('razonSocial','razonSocial_error');
      razonSocial.classList.replace('razonSocial_focus','razonSocial_error');
      return;
    }else{
    this.usuarioSercice.actualizarUsuario(this.usuario, this.usuario.id).subscribe(res =>{
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser=res;
      localStorage.setItem('currentUser', JSON.stringify([currentUser]));
      this.editar_razonSocial=true;
      this.cancelar_razonSocial=false;
    }, error => console.log(error));
    }
  }
  handleClickCancelarrazonSocial(){
    this.usuarioSercice.obtenerUsuarioPorId(this.usuario.id).subscribe((res:any)=>{
      this.usuario.razonSocial=res.razonSocial;
      this.editar_razonSocial=true;
      this.cancelar_razonSocial=false;
    })
    this.razonSocialEmpy=false;
    this.razonSocialInvalid=false;
  }
  handleInputChangerazonSocial(){
    this.razonSocialInvalid = !this.validarRazonsocial(this.usuario.razonSocial);
    const razonSocial=document.querySelector("#razonSocial");
    razonSocial.classList.replace("razonSocial","razonSocial_focus")
    razonSocial.classList.replace('razonSocial_error','razonSocial_focus');
    razonSocial.classList.replace('razonSocial_error','razonSocial');
    
    if(this.usuario.razonSocial==""){
      razonSocial.classList.replace('razonSocial','razonSocial_error');
      razonSocial.classList.replace('razonSocial_focus','razonSocial_error');
      this.razonSocialInvalid=false;
      this.razonSocialEmpy=true;
    }

    if(this.usuario.razonSocial!=""){
      if(this.razonSocialInvalid==true){
        razonSocial.classList.replace('razonSocial','razonSocial_error');
        razonSocial.classList.replace('razonSocial_focus','razonSocial_error');
        this.razonSocialEmpy=false;
      }
      if(this.razonSocialEmpy==true){
        this.razonSocialEmpy=false;
      }
    }
  }
  razonSocialFocus(){
    this.razonSocialEmpy = false;
    this.razonSocialInvalid=false
    const razonSocial=document.querySelector("#razonSocial");
    razonSocial.classList.replace('razonSocial_error','razonSocial_focus');
  }
  razonSocialBlur(){
    const razonSocial=document.querySelector("#razonSocial");
    if(!this.usuario.razonSocial){
      this.razonSocialInvalid=false
      this.razonSocialEmpy = true;
      razonSocial.classList.replace('razonSocial','razonSocial_error');
      razonSocial.classList.replace('razonSocial_focus','razonSocial_error');
      return;
    }
    this.razonSocialEmpy = false;
    this.razonSocialInvalid = !this.validarRazonsocial(this.usuario.razonSocial);

    if(this.razonSocialInvalid == true){
      const razonSocial=document.querySelector("#razonSocial");
      razonSocial.classList.replace('razonSocial','razonSocial_error');
      razonSocial.classList.replace('razonSocial_focus','razonSocial_error');
      return;
    }
  }

  // Actividad Comercial
  handleClickEditaractividadComercial(){
    this.editar_actividadComercial=false;
    this.cancelar_actividadComercial=true;
  }
  handleClickGuardaractividadComercial(){
    if(this.actividadComercialInvalid == true){
      const actividadComercial=document.querySelector("#actividadComercial");
      actividadComercial.classList.replace('actividadComercial','actividadComercial_error');
      actividadComercial.classList.replace('actividadComercial_focus','actividadComercial_error');
      return;
    }
    else if(this.actividadComercialEmpy == true){
      const actividadComercial=document.querySelector("#actividadComercial");
      actividadComercial.classList.replace('actividadComercial','actividadComercial_error');
      actividadComercial.classList.replace('actividadComercial_focus','actividadComercial_error');
      return;
    }else{
    this.usuarioSercice.actualizarUsuario(this.usuario, this.usuario.id).subscribe(res =>{
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser=res;
      localStorage.setItem('currentUser', JSON.stringify([currentUser]));
      this.editar_actividadComercial=true;
      this.cancelar_actividadComercial=false;
    }, error => console.log(error));
    }
  }
  handleClickCancelaractividadComercial(){
    this.usuarioSercice.obtenerUsuarioPorId(this.usuario.id).subscribe((res:any)=>{
      this.usuario.actividadcomercial=res.actividadcomercial;
      this.editar_actividadComercial=true;
      this.cancelar_actividadComercial=false;
    })
    this.actividadComercialEmpy=false;
    this.actividadComercialInvalid=false;
  }
  handleInputChangeactividadComercial(){
    this.actividadComercialInvalid = !this.validarActividadComercial(this.usuario.actividadcomercial);
    const actividadComercial=document.querySelector("#actividadComercial");
    actividadComercial.classList.replace("actividadComercial","actividadComercial_focus")
    actividadComercial.classList.replace('actividadComercial_error','actividadComercial_focus');
    actividadComercial.classList.replace('actividadComercial_error','actividadComercial');
    
    if(this.usuario.actividadcomercial==""){
      actividadComercial.classList.replace('actividadComercial','actividadComercial_error');
      actividadComercial.classList.replace('actividadComercial_focus','actividadComercial_error');
      this.actividadComercialInvalid=false;
      this.actividadComercialEmpy=true;
    }

    if(this.usuario.actividadcomercial!=""){
      if(this.actividadComercialInvalid==true){
        actividadComercial.classList.replace('actividadComercial','actividadComercial_error');
        actividadComercial.classList.replace('actividadComercial_focus','actividadComercial_error');
        this.actividadComercialEmpy=false;
      }
      if(this.actividadComercialEmpy==true){
        this.actividadComercialEmpy=false;
      }
    }
  }
  actividadComercialFocus(){
    this.actividadComercialEmpy = false;
    this.actividadComercialInvalid=false
    const actividadComercial=document.querySelector("#actividadComercial");
    actividadComercial.classList.replace('actividadComercial_error','actividadComercial_focus');
  }
  actividadComercialBlur(){
    const actividadComercial=document.querySelector("#actividadComercial");
    if(!this.usuario.actividadcomercial){
      this.actividadComercialInvalid=false
      this.actividadComercialEmpy = true;
      actividadComercial.classList.replace('actividadComercial','actividadComercial_error');
      actividadComercial.classList.replace('actividadComercial_focus','actividadComercial_error');
      return;
    }
    this.actividadComercialEmpy = false;
    this.actividadComercialInvalid = !this.validarActividadComercial(this.usuario.actividadcomercial);

    if(this.actividadComercialInvalid == true){
      const actividadComercial=document.querySelector("#actividadComercial");
      actividadComercial.classList.replace('actividadComercial','actividadComercial_error');
      actividadComercial.classList.replace('actividadComercial_focus','actividadComercial_error');
      return;
    }
  }

  // Ruc
  handleClickEditarruc(){
    this.editar_ruc=false;
    this.cancelar_ruc=true;
  }
  handleClickGuardarruc(){
    if(this.rucInvalid == true){
      const ruc=document.querySelector("#ruc");
      ruc.classList.replace('ruc','ruc_error');
      ruc.classList.replace('ruc_focus','ruc_error');
      return;
    }
    else if(this.rucEmpy == true){
      const ruc=document.querySelector("#ruc");
      ruc.classList.replace('ruc','ruc_error');
      ruc.classList.replace('ruc_focus','ruc_error');
      return;
    }else{
      console.log(this.usuario)

    this.usuarioSercice.actualizarUsuario(this.usuario, this.usuario.id).subscribe(res =>{
        
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser=res;
      localStorage.setItem('currentUser', JSON.stringify([currentUser]));
      this.editar_ruc=true;
      this.cancelar_ruc=false;
    }, error => {
      console.log(error);
      this.rucExiste=true;
      this.rucEmpy=false;
      this.rucInvalid=false;
      const ruc=document.querySelector("#ruc");
      ruc.classList.replace('ruc','ruc_error');
      ruc.classList.replace('ruc_focus','ruc_error');
    });
    }
  }
  handleClickCancelarruc(){
    this.usuarioSercice.obtenerUsuarioPorId(this.usuario.id).subscribe((res:any)=>{
      this.usuario.ruc=res.ruc;
      this.editar_ruc=true;
      this.cancelar_ruc=false;
    })
    this.rucEmpy=false;
    this.rucInvalid=false;
    this.rucExiste=false;
  }
  handleInputChangeruc(){
    this.rucExiste=false;
    this.rucInvalid = !this.validarRUC(this.usuario.ruc);
    const ruc=document.querySelector("#ruc");
    ruc.classList.replace("ruc","ruc_focus")
    ruc.classList.replace('ruc_error','ruc_focus');
    ruc.classList.replace('ruc_error','ruc');
    
    if(this.usuario.ruc==""){
      ruc.classList.replace('ruc','ruc_error');
      ruc.classList.replace('ruc_focus','ruc_error');
      this.rucInvalid=false;
      this.rucEmpy=true;
    }

    if(this.usuario.ruc!=""){
      if(this.rucInvalid==true){
        ruc.classList.replace('ruc','ruc_error');
        ruc.classList.replace('ruc_focus','ruc_error');
        this.rucEmpy=false;
      }
      if(this.rucEmpy==true){
        this.rucEmpy=false;
      }
    }
  }
  rucFocus(){
    this.rucEmpy = false;
    this.rucInvalid=false;
    this.rucExiste=false;
    const ruc=document.querySelector("#ruc");
    ruc.classList.replace('ruc_error','ruc_focus');
  }
  rucBlur(){
    this.rucExiste=false;
    const ruc=document.querySelector("#ruc");
    if(!this.usuario.ruc){
      this.rucInvalid=false
      this.rucEmpy = true;
      ruc.classList.replace('ruc','ruc_error');
      ruc.classList.replace('ruc_focus','ruc_error');
      return;
    }
    this.rucEmpy = false;
    this.rucInvalid = !this.validarRUC(this.usuario.ruc);

    if(this.rucInvalid == true){
      const ruc=document.querySelector("#ruc");
      ruc.classList.replace('ruc','ruc_error');
      ruc.classList.replace('ruc_focus','ruc_error');
      return;
    }
  }

  //Descripcion
  handleClickEditardescripcion(){
    this.editar_descripcion=false;
    this.cancelar_descripcion=true;
  }
  handleClickGuardardescripcion(){
    if(this.descripcionInvalid == true){
      const descripcion=document.querySelector("#descripcion");
      descripcion.classList.replace('descripcion','descripcion_error');
      descripcion.classList.replace('descripcion_focus','descripcion_error');
      return;
    }
    else if(this.descripcionEmpy == true){
      const descripcion=document.querySelector("#descripcion");
      descripcion.classList.replace('descripcion','descripcion_error');
      descripcion.classList.replace('descripcion_focus','descripcion_error');
      return;
    }else{
      console.log(this.usuario)

    this.usuarioSercice.actualizarUsuario(this.usuario, this.usuario.id).subscribe(res =>{
        
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      currentUser=res;
      localStorage.setItem('currentUser', JSON.stringify([currentUser]));
      this.editar_descripcion=true;
      this.cancelar_descripcion=false;
    }, error => {
      console.log(error);
    });
    }
  }
  handleClickCancelardescripcion(){
    this.usuarioSercice.obtenerUsuarioPorId(this.usuario.id).subscribe((res:any)=>{
      this.usuario.descripcion=res.descripcion;
      this.editar_descripcion=true;
      this.cancelar_descripcion=false;
    })
    this.descripcionEmpy=false;
    this.descripcionInvalid=false;
  }
  handleInputChangedescripcion(){
    this.descripcionInvalid = !this.validarDescripcion(this.usuario.descripcion);
    const descripcion=document.querySelector("#descripcion");
    descripcion.classList.replace("descripcion","descripcion_focus")
    descripcion.classList.replace('descripcion_error','descripcion_focus');
    descripcion.classList.replace('descripcion_error','descripcion');
    
    if(this.usuario.descripcion==""){
      descripcion.classList.replace('descripcion','descripcion_error');
      descripcion.classList.replace('descripcion_focus','descripcion_error');
      this.descripcionInvalid=false;
      this.descripcionEmpy=true;
    }

    if(this.usuario.descripcion!=""){
      if(this.descripcionInvalid==true){
        descripcion.classList.replace('descripcion','descripcion_error');
        descripcion.classList.replace('descripcion_focus','descripcion_error');
        this.descripcionEmpy=false;
      }
      if(this.descripcionEmpy==true){
        this.descripcionEmpy=false;
      }
    }
  }
  descripcionFocus(){
    this.descripcionEmpy = false;
    this.descripcionInvalid=false;
    const descripcion=document.querySelector("#descripcion");
    descripcion.classList.replace('descripcion_error','descripcion_focus');
  }
  descripcionBlur(){
    const descripcion=document.querySelector("#descripcion");
    if(!this.usuario.descripcion){
      this.descripcionInvalid=false
      this.descripcionEmpy = true;
      descripcion.classList.replace('descripcion','descripcion_error');
      descripcion.classList.replace('descripcion_focus','descripcion_error');
      return;
    }
    this.descripcionEmpy = false;
    this.descripcionInvalid = !this.validarDescripcion(this.usuario.descripcion);

    if(this.descripcionInvalid == true){
      const descripcion=document.querySelector("#descripcion");
      descripcion.classList.replace('descripcion','descripcion_error');
      descripcion.classList.replace('descripcion_focus','descripcion_error');
      return;
    }
  }

}