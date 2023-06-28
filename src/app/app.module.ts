import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUsuariosComponent } from './admin/lista-usuarios/lista-usuarios.component';
import { HttpClientModule } from '@angular/common/http';
// import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { FormsModule } from '@angular/forms';
import { ActualizarUsuarioComponent } from './admin/actualizar-usuario/actualizar-usuario.component';
// import { LoginComponent } from './login/login.component';
import { RegistrarCuentaBancariaComponent } from './registrar-cuenta-bancaria/registrar-cuenta-bancaria.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroupDirective } from '@angular/forms';

import { AuthGuard } from './services/AuthGuard';
// import { LoginComponent } from './login/login.component';
import { RetirarCuentaBancariaComponent } from './cuenta-bancaria/retirar-cuenta-bancaria/retirar-cuenta-bancaria.component';
import { DepositarCuentaBancariaComponent } from './cuenta-bancaria/depositar-cuenta-bancaria/depositar-cuenta-bancaria.component';
import { EstadoDashboardComponent } from './cuenta-bancaria/estado-dashboard/estado-dashboard.component';
import { EstadoCuentaBancariaComponent } from './cuenta-bancaria/estado-cuenta-bancaria/estado-cuenta-bancaria.component';
import { TransferenciaCuentaBancariaComponent } from './cuenta-bancaria/transferencia-cuenta-bancaria/transferencia-cuenta-bancaria.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ListarCuentabancariaComponent } from './cuenta-bancaria/listar-cuentabancaria/listar-cuentabancaria.component';
import { CuentaBancariaCardComponent } from './cuenta-bancaria/cuenta-bancaria-card/cuenta-bancaria-card.component';
import { ActualizarCuentaBancariaComponent } from './cuenta-bancaria/actualizar-cuenta-bancaria/actualizar-cuenta-bancaria.component';



import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ListarMovimientosComponent } from './movimiento/listar-movimientos/listar-movimientos.component';

import { RegistrardeudorComponent } from './deudor/registrardeudor/registrardeudor.component';

import { ListardeudorComponent } from './deudor/listardeudor/listardeudor.component';
import { ActualizardeudorComponent } from './deudor/actualizardeudor/actualizardeudor.component';
import { ListarsubastaComponent } from './subasta/listarsubasta/listarsubasta.component';
import { DetalleComponent } from './cuentabancaria/detalle/detalle.component';
import { RegistrafacturaComponent } from './factura/registrafactura/registrafactura.component';
import { RegistrarSubastaComponent } from './subasta/registrar-subasta/registrar-subasta.component';
import { ModalXmlComponent } from './subasta/modal-xml/modal-xml.component';
// <<<<<<< AV03-Bocangelino
// <<<<<<< HEAD
import { CuentaUsuarioComponente } from './cuentaUsuario/cuentaUsuario.component';
// =======
import { MovimientoComponent } from './usuarios/movimientos/movimiento.component';
// import { DetallesubastaComponent } from './subasta/detallesubasta/detallesubasta.component';
import { RegistrarUsuarioComponent } from './autenticacion/registrar-usuario/registrar-usuario.component';
import { LoginComponent } from './autenticacion/login/login.component';
// >>>>>>> master
// =======

// import { MiCuentaComponente } from './cuenta/cuenta.component';

// import { MovimientoComponent } from './usuarios/movimientos/movimiento.component';
import { DetallesubastaComponent } from './subasta/detallesubasta/detallesubasta.component';
import { ListainversionesComponent } from './inversiones/listainversiones/listainversiones.component';
import { CrearbancomongoComponent } from './bancomongo/crearbancomongo/crearbancomongo.component';
import { ListarbancomongoComponent } from './bancomongo/listarbancomongo/listarbancomongo.component';
import { ActualizabancomongoComponent } from './bancomongo/actualizabancomongo/actualizabancomongo.component';
import { CrearmonedaporstreComponent } from './monedapostgre/crearmonedaporstre/crearmonedaporstre.component';
import { ListarmonedapostgreComponent } from './monedapostgre/listarmonedapostgre/listarmonedapostgre.component';
import { ActualizapostgreComponent } from './monedapostgre/actualizapostgre/actualizapostgre.component';

// >>>>>>> master


@NgModule({
  declarations: [
    AppComponent,
    ListaUsuariosComponent,
    RegistrarUsuarioComponent,
    ActualizarUsuarioComponent,
    LoginComponent,
    RegistrarCuentaBancariaComponent,
    RetirarCuentaBancariaComponent,
    DepositarCuentaBancariaComponent,
    EstadoDashboardComponent,
    EstadoCuentaBancariaComponent,
    TransferenciaCuentaBancariaComponent,

    ListarCuentabancariaComponent,
    CuentaBancariaCardComponent,
    ActualizarCuentaBancariaComponent,

    DashboardComponent,
    ListarMovimientosComponent,

    RegistrardeudorComponent,

    ListardeudorComponent,
     ActualizardeudorComponent,
     ListarsubastaComponent,
     DetalleComponent,

    RegistrafacturaComponent,
    RegistrarSubastaComponent,
    ModalXmlComponent,
    MovimientoComponent,
    DetallesubastaComponent,
// <<<<<<< AV03-Bocangelino
    CuentaUsuarioComponente,

  // Cuenta de Usuario
    // MiCuentaComponente
// =======

  // Cuenta de Usuario
//     MiCuentaComponente,
   ListainversionesComponent,
   CrearbancomongoComponent,
   ListarbancomongoComponent,
   ActualizabancomongoComponent,
   CrearmonedaporstreComponent,
   ListarmonedapostgreComponent,
   ActualizapostgreComponent
// >>>>>>> master
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // BrowserAnimationsModule,
      MaterialModule,
    // AppMaterialModule,
    BrowserAnimationsModule

  ],
  providers: [AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
