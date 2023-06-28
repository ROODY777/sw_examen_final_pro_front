import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './admin/lista-usuarios/lista-usuarios.component';
// import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { ActualizarUsuarioComponent } from './admin/actualizar-usuario/actualizar-usuario.component';
// import { LoginComponent } from './login/login.component';
import { RegistrarCuentaBancariaComponent } from './registrar-cuenta-bancaria/registrar-cuenta-bancaria.component';

import { AuthGuard } from './services/AuthGuard';
// import { Inicio } from './usuarios/Inicio/inicio.component';
// import { CuentaBancaria } from './usuarios/cuentaBancaria/cuentaBancaria.component';
// import { Deposito } from './usuarios/depositos/deposito.component';
// import { Retiro } from './usuarios/retiros/retiro.component';
import { EstadoCuenta } from './estadoCuenta/estadoCuenta.component';

import { EstadoDashboardComponent } from './cuenta-bancaria/estado-dashboard/estado-dashboard.component';
import { TransferenciaCuentaBancariaComponent } from './cuenta-bancaria/transferencia-cuenta-bancaria/transferencia-cuenta-bancaria.component';
import { EstadoCuentaBancariaComponent } from './cuenta-bancaria/estado-cuenta-bancaria/estado-cuenta-bancaria.component';

import { ListarCuentabancariaComponent } from './cuenta-bancaria/listar-cuentabancaria/listar-cuentabancaria.component';
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
// <<<<<<< AV03-Bocangelino
// import { DashboardInversionistaComponent } from './dashboardInversionista/dashboardInversionista.component';
// import { DashboardEmpresaComponent } from './dashboard/dashboardEmpresa/dashboardEmpresa.component';
import { CuentaUsuarioComponente } from './cuentaUsuario/cuentaUsuario.component';
import { MisInversiones } from './inversiones/inversiones.component';
import { LoginComponent } from './autenticacion/login/login.component';
import { RegistrarUsuarioComponent } from './autenticacion/registrar-usuario/registrar-usuario.component';
import { DashboardUsuarioComponent } from './dashboard/dashboardUsuario/dashboardUsuario.component';
// import { DashboardInversionistaComponent } from './dashboard/dashboardUsuario/dashboardUsuario.component';
// =======
import { MovimientoComponent } from './usuarios/movimientos/movimiento.component';
import { ListainversionesComponent } from './inversiones/listainversiones/listainversiones.component';
import { ActualizapostgreComponent } from './monedapostgre/actualizapostgre/actualizapostgre.component';
import { ListarmonedapostgreComponent } from './monedapostgre/listarmonedapostgre/listarmonedapostgre.component';
import { ListarbancomongoComponent } from './bancomongo/listarbancomongo/listarbancomongo.component';
import { CrearbancomongoComponent } from './bancomongo/crearbancomongo/crearbancomongo.component';
import { ActualizabancomongoComponent } from './bancomongo/actualizabancomongo/actualizabancomongo.component';
import { monedapostgre } from './monedapostgre/monedapostgre';
import { CrearmonedaporstreComponent } from './monedapostgre/crearmonedaporstre/crearmonedaporstre.component';
// >>>>>>> master
// =======

// import { DashboardInversionistaComponent } from './dashboardInversionista/dashboardInversionista.component';
// import { DashboardEmpresaComponent } from './dashboardEmpresa/dashboardEmpresa.component';
// import { MiCuentaComponente } from './cuenta/cuenta.component';
// import { MisInversiones } from './inversiones/inversiones.component';

// import { MovimientoComponent } from './usuarios/movimientos/movimiento.component';
// import { ListainversionesComponent } from './inversiones/listainversiones/listainversiones.component';
// >>>>>>> master




//ACTUALIZADO RECIENTE
const routes: Routes = [
  // { path: '',  redirectTo: '', pathMatch: 'full',canActivate: [AuthGuard] },

  //Rutas de autenticacion "login / registro"
  { path: 'login', component: LoginComponent},
  {path: 'registrar-usuario', component: RegistrarUsuarioComponent},


  {path: 'listar-subasta', component: ListarsubastaComponent},
  {path: 'listar-inversiones', component: ListainversionesComponent},
  {path: 'crearBancoMongo', component: CrearbancomongoComponent},
  {path: 'listar-banco-mongo', component: ListarbancomongoComponent},
  {path: 'actualiza-banco-mongo/:id', component: ActualizabancomongoComponent},
  {path: 'crearMonedaPostgre', component: CrearmonedaporstreComponent},
  {path: 'listar-moneda-postgre', component: ListarmonedapostgreComponent},
  {path: 'actualiza-moneda-postgre/:id', component: ActualizapostgreComponent},

// <<<<<<< AV03-Bocangelino
// =======

//   //Ruta de dashboard de usuarios
//   {path: 'inversionista/dashboard', component: DashboardInversionistaComponent,canActivate: [AuthGuard]},
//   {path: 'empresa/dashboard', component: DashboardInversionistaComponent,canActivate: [AuthGuard]},

//   //Ruta del inversionista
//   {path: 'micuenta/personal/:id', component: MiCuentaComponente,canActivate: [AuthGuard]},
//   {path: 'inversionista/oportunidad-de-inversion', component: ListarsubastaComponent,canActivate: [AuthGuard]},
//   {path: 'inversionista/mis-inversiones', component: MisInversiones,canActivate: [AuthGuard]},

//   {path: '', component:Inicio, pathMatch: 'full',canActivate: [AuthGuard] },

//   {path: 'movimiento', component: MovimientoComponent,canActivate: [AuthGuard]},
//  // {path: 'cuentaBancaria', component: CuentaBancaria,canActivate: [AuthGuard]},//ROODY COMENTE
//   {path: 'cuentaBancaria', component: ListarCuentabancariaComponent,canActivate: [AuthGuard]},
//   {path: 'deposito', component: Deposito,canActivate: [AuthGuard]},
//   {path: 'retiro', component: Retiro,canActivate: [AuthGuard]},

//   {path: 'estadoCuenta', component: EstadoCuenta,canActivate: [AuthGuard]},

//   //Ruta de la empresa
//   {path: 'empresa/subasta', component: RegistrarSubastaComponent,canActivate: [AuthGuard]},

//   //Ruta de la empresa

  
// >>>>>>> master

  {path: 'inversionista/dashboard', component: DashboardUsuarioComponent,canActivate: [AuthGuard]},
  {path: 'empresa/dashboard', component: DashboardUsuarioComponent,canActivate: [AuthGuard]},

  {path: 'micuenta/personal/:id', component: CuentaUsuarioComponente,canActivate: [AuthGuard]},

  {path: 'inversionista/oportunidad-de-inversion', component: ListarsubastaComponent,canActivate: [AuthGuard]},
  {path: 'inversionista/mis-inversiones', component: MisInversiones,canActivate: [AuthGuard]},

  {path: 'empresa/subasta', component: RegistrarSubastaComponent,canActivate: [AuthGuard]},

  {path: 'estado-dashboard', component: EstadoDashboardComponent, children: [
    // {path: 'movimiento', component: ListarMovimientosComponent,canActivate: [AuthGuard]},
    {path: 'movimiento', component: MovimientoComponent,canActivate: [AuthGuard]},
    {path: 'transferencia-cuenta-bancaria', component: TransferenciaCuentaBancariaComponent,canActivate: [AuthGuard]},
    {path: 'estado-cuenta-bancaria', component: ListarCuentabancariaComponent,canActivate: [AuthGuard]},
    {path: 'estado-cuenta-bancaria/registrar-cuenta-bancaria', component: RegistrarCuentaBancariaComponent},
    {path: 'estado-cuenta-bancaria/actualizar-cuenta-bancaria/:id', component: ActualizarCuentaBancariaComponent},
  ]},
// //   {path: '', component:Inicio, pathMatch: 'full',canActivate: [AuthGuard] },
// //   // {path: '', component:Inicio, pathMatch: 'full',canActivate: [AuthGuard] },

//ADMIN
// {path: 'usuarios', component: ListaUsuariosComponent,canActivate: [AuthGuard]},
// {path: 'actualizar-usuario/:id', component: ActualizarUsuarioComponent},
// {path: 'admin', component: DashboardComponent, children: [
// {path: 'lista-movimientos', component: ListarMovimientosComponent}
// ]},

// {path: '', redirectTo:'/login', pathMatch:'full'}
// { path: '', redirectTo: '', pathMatch: 'full' }

// <<<<<<< AV03-Bocangelino
// =======
// //   {path: 'actualizar-usuario/:id', component: ActualizarUsuarioComponent},
// //   //{path: 'login', component: LoginComponent},
//   {path: 'registrar-cuenta-bancaria', component: RegistrarCuentaBancariaComponent},
//   {path: 'actualizar-cuenta-bancaria/:id', component: ActualizarCuentaBancariaComponent},
//   {path: 'listar-cuenta-bancaria', component: ListarCuentabancariaComponent},
//   {path: 'listar-inversiones', component: ListainversionesComponent},
// //   {path: 'estado-dashboard', component: EstadoDashboardComponent, children: [
// //     {path: 'transferencia-cuenta-bancaria', component: TransferenciaCuentaBancariaComponent},
//     // {path: 'estado-cuenta-bancaria', component: EstadoCuentaBancariaComponent}
// //   ]},
// >>>>>>> master
  
//
  // {path: 'registrar-factura', component: RegistrafacturaComponent},
// //   //{path: '', redirectTo:'login', pathMatch:'full'}
// // {path: 'registrar-deudor', component: RegistrardeudorComponent},
// // {path: 'listar-deudor', component: ListardeudorComponent},
// // {path: 'actualizar-deudor/:id', component: ActualizardeudorComponent},
// {path: 'listar-subasta', component: ListarsubastaComponent},

// // //{path: 'cuentaBancaria/ver/:id', component: DetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
