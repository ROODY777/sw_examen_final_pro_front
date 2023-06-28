import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarUsuarioComponent } from './registrar-usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Asegúrate de tener esta importación

describe('RegistrarUsuarioComponent', () => {
  let component: RegistrarUsuarioComponent;
  let fixture: ComponentFixture<RegistrarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule], // Agrega FormsModule aquí
      declarations: [ RegistrarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Correo
  it('no debe mostrar un mensaje de error cuando el correo electrónico es válido', () => {
    component.usuario.email = 'correo@ejemplo.com';
    const isValid = component.validateEmail(component.usuario.email);
    fixture.detectChanges();
    expect(isValid).toBe(true);
  });

  it('debería mostrar un mensaje de error cuando el correo electrónico no es válido', () => {
    component.usuario.email = 'correo_invalido';
    fixture.detectChanges();
  
    const isValid = component.validateEmail(component.usuario.email);
    component.emailInvalid = !isValid;
    fixture.detectChanges();
  
    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#email_invalido');
    if (!isValid) {
      expect(errorElement.textContent).toContain('El correo electrónico no es válido.');
    }
    expect(isValid).toBe(false);
  });
  
  it('debería mostrar un mensaje de error cuando el correo electrónico no es válido', () => {
    component.usuario.email = '';
    component.emailEmpty = true;
    fixture.detectChanges();

    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#email_empty');
    expect(errorElement.textContent).toContain('Ingrese un correo electrónico.');
  });

  //Contraseña
  it('no debe mostrar un mensaje de error cuando la contraseña es válido', () => {
    component.usuario.contrasena = 'Cibertec1234-';
    const isValid = component.validarPassword(component.usuario.contrasena);
    fixture.detectChanges();
    expect(isValid).toBe(true);
  });

  it('debería mostrar un mensaje de error cuando la contraseña no es válido', () => {
    component.usuario.contrasena = 'contraseña_invalido';
    fixture.detectChanges();
  
    const isValid = component.validarPassword(component.usuario.contrasena);
    component.passwordInvalid = !isValid;
    fixture.detectChanges();
  
    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#contraseña_invalido');
    if (!isValid) {
      expect(errorElement.textContent).toContain('La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número');
    }
    expect(isValid).toBe(false);
  });
  
  it('debería mostrar un mensaje de error cuando la contraseña no es válido', () => {
    component.usuario.contrasena = '';
    component.passwordEmpy = true;
    fixture.detectChanges();

    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#contraseña_empty');
    expect(errorElement.textContent).toContain('Ingrese una contraseña');
  });

  //Nombre
  it('no debe mostrar un mensaje de error cuando el nombre es válido', () => {
    component.usuario.nombres = 'Frank Smith';
    const isValid = component.validarNombre(component.usuario.nombres);
    fixture.detectChanges();
    expect(isValid).toBe(true);
  });

  it('debería mostrar un mensaje de error cuando el nombre no es válido', () => {
    component.usuario.nombres = ' Frank';
    fixture.detectChanges();
  
    const isValid = component.validarNombre(component.usuario.nombres);
    component.nameInvalid = !isValid;
    fixture.detectChanges();
  
    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#nombre_invalido');
    if (!isValid) {
      expect(errorElement.textContent).toContain('El nombre no es válido.');
    }
    expect(isValid).toBe(false);
  });
  
  it('debería mostrar un mensaje de error cuando el nombre no es válido', () => {
    component.usuario.nombres = '';
    component.nameEmpy = true;
    fixture.detectChanges();

    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#nombre_empty');
    expect(errorElement.textContent).toContain('Ingrese un nombre.');
  });
  
  //Apellido Paterno
  it('no debe mostrar un mensaje de error cuando el apellido Paterno es válido', () => {
    component.usuario.apellidoPaterno = 'Bocangelino';
    const isValid = component.validarApellido(component.usuario.apellidoPaterno);
    fixture.detectChanges();
    expect(isValid).toBe(true);
  });

  it('debería mostrar un mensaje de error cuando el apellido Paterno no es válido', () => {
    component.usuario.apellidoPaterno = ' Bocangelino';
    fixture.detectChanges();
  
    const isValid = component.validarApellido(component.usuario.apellidoPaterno);
    component.apellidoPaternoInvalid = !isValid;
    fixture.detectChanges();
  
    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#apellidoPaterno_invalido');
    if (!isValid) {
      expect(errorElement.textContent).toContain('El Apellido Paterno no es válido.');
    }
    expect(isValid).toBe(false);
  });
  
  it('debería mostrar un mensaje de error cuando el apellido Paterno no es válido', () => {
    component.usuario.apellidoPaterno = '';
    component.apellidoPaternoEmpy = true;
    fixture.detectChanges();

    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#apellidoPaterno_empty');
    expect(errorElement.textContent).toContain('Ingrese un Apellido Paterno.');
  });

  //Apellido Materno
  it('no debe mostrar un mensaje de error cuando el apellido Materno es válido', () => {
    component.usuario.apellidoMaterno = 'Rojas';
    const isValid = component.validarApellido(component.usuario.apellidoMaterno);
    fixture.detectChanges();
    expect(isValid).toBe(true);
  });

  it('debería mostrar un mensaje de error cuando el apellido Materno no es válido', () => {
    component.usuario.apellidoMaterno = ' Rojas';
    fixture.detectChanges();
  
    const isValid = component.validarApellido(component.usuario.apellidoMaterno);
    component.apellidoMaternoInvalid = !isValid;
    fixture.detectChanges();
  
    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#apellidoMaterno_invalido');
    if (!isValid) {
      expect(errorElement.textContent).toContain('El Apellido Materno no es válido.');
    }
    expect(isValid).toBe(false);
  });
  
  it('debería mostrar un mensaje de error cuando el apellido Materno no es válido', () => {
    component.usuario.apellidoMaterno = '';
    component.apellidoMaternoEmpy = true;
    fixture.detectChanges();

    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#apellidoMaterno_empty');
    expect(errorElement.textContent).toContain('Ingrese un Apellido Materno.');
  });

  //Direccion
  it('no debe mostrar un mensaje de error cuando dirección es válido', () => {
    component.usuario.direccion = 'Calle 1';
    const isValid = component.validarDireccion(component.usuario.direccion);
    fixture.detectChanges();
    expect(isValid).toBe(true);
  });

  it('debería mostrar un mensaje de error cuando direccion no es válido', () => {
    component.usuario.direccion = '  -.';
    fixture.detectChanges();
  
    const isValid = component.validarDireccion(component.usuario.direccion);
    component.direccionInvalid = !isValid;
    fixture.detectChanges();
  
    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#direccion_invalido');
    if (!isValid) {
      expect(errorElement.textContent).toContain('La direccion no es válido.');
    }
    expect(isValid).toBe(false);
  });
  
  it('debería mostrar un mensaje de error cuando la direccion no es válido', () => {
    component.usuario.direccion = '';
    component.direccionEmpy = true;
    fixture.detectChanges();

    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#direccion_empty');
    expect(errorElement.textContent).toContain('Ingrese una direccion.');
  });

  //Ruc
   it('no debe mostrar un mensaje de error cuando el ruc es válido', () => {
    component.usuario.ruc = '10123456789';
    const isValid = component.validarRUC(component.usuario.ruc);
    fixture.detectChanges();
    expect(isValid).toBe(true);
  });

  // it('debería mostrar un mensaje de error cuando ruc no es válido', () => {
  //   component.usuario.ruc = '  192334234';
  //   fixture.detectChanges();
  
  //   const isValid = component.validarRUC(component.usuario.ruc);
  //   component.rucInvalid= true;
  //   fixture.detectChanges();
  
  //   const errorElement: HTMLElement = fixture.nativeElement.querySelector('#ruc_invalido');
  //   if (!isValid) {
  //     expect(errorElement.textContent).toContain('El Ruc no es válido.');
  //   }
  //   expect(isValid).toBe(false);
  // });
  
  // it('debería mostrar un mensaje de error cuando el ruc no es válido', () => {
  //   component.usuario.ruc = '';
  //   component.rucEmpy = true;
  //   fixture.detectChanges();

  //   const errorElement: HTMLElement = fixture.nativeElement.querySelector('#ruc_empty');
  //   expect(errorElement.textContent).toContain('Ingrese un Ruc.');
  // });

  //Razon Social
  it('no debe mostrar un mensaje de error cuando la razon Social es válido', () => {
    component.usuario.razonSocial = 'Holguin';
    const isValid = component.validarRazonsocial(component.usuario.razonSocial);
    fixture.detectChanges();
    expect(isValid).toBe(true);
  });

  // it('debería mostrar un mensaje de error cuando la razon Social no es válido', () => {
  //   component.usuario.razonSocial = '  ASd_';
  //   fixture.detectChanges();
  
  //   const isValid = component.validarRazonsocial(component.usuario.razonSocial);
  //   component.razonsocialInvalid= !isValid;
  //   fixture.detectChanges();
  
  //   const errorElement: HTMLElement = fixture.nativeElement.querySelector('#razonSocial_invalido');
  //   if (!isValid) {
  //     expect(errorElement.textContent).toContain('La Razon Social no es válido.');
  //   }
  //   expect(isValid).toBe(false);
  // });
  
  // it('debería mostrar un mensaje de error cuando la razon Social no es válido', () => {
  //   component.usuario.razonSocial = '';
  //   component.razonsocialEmpy = true;
  //   fixture.detectChanges();

  //   const errorElement: HTMLElement = fixture.nativeElement.querySelector('#razonSocial_empty');
  //   expect(errorElement.textContent).toContain('Ingrese una Razon Social.');
  // });

  //Actividad Comercial
  it('no debe mostrar un mensaje de error cuando la actividad comercial es válido', () => {
    component.usuario.actividadcomercial = 'Desarrollador de software';
    const isValid = component.validarActividadComercial(component.usuario.actividadcomercial);
    fixture.detectChanges();
    expect(isValid).toBe(true);
  });

  // it('debería mostrar un mensaje de error cuando la actividad comercial no es válido', () => {
  //   component.usuario.actividadcomercial = '  12';
  //   fixture.detectChanges();
  
  //   const isValid = component.validarActividadComercial(component.usuario.actividadcomercial);
  //   component.actividadcomercialInvalid= !isValid;
  //   fixture.detectChanges();
  
  //   const errorElement: HTMLElement = fixture.nativeElement.querySelector('#actividadComercial_invalido');
  //   if (!isValid) {
  //     expect(errorElement.textContent).toContain('La Actividad Comercial no es válido.');
  //   }
  //   expect(isValid).toBe(false);
  // });
  
  // it('debería mostrar un mensaje de error cuando la actividad comercial no es válido', () => {
  //   component.usuario.actividadcomercial = '';
  //   component.actividadcomercialEmpy = true;
  //   fixture.detectChanges();

  //   const errorElement: HTMLElement = fixture.nativeElement.querySelector('#actividadComercial_empty');
  //   expect(errorElement.textContent).toContain('Ingrese una Actividad Comercial.');
  // });


  //Telefono
  it('no debe mostrar un mensaje de error cuando el telefono es válido', () => {
    component.usuario.telefono = '926749330';
    const isValid = component.validarTelefono(component.usuario.telefono);
    fixture.detectChanges();
    expect(isValid).toBe(true);
  });

  it('debería mostrar un mensaje de error cuando telefono no es válido', () => {
    component.usuario.telefono = '  925643232';
    fixture.detectChanges();
  
    const isValid = component.validarTelefono(component.usuario.telefono);
    component.telefonoInvalid = !isValid;
    fixture.detectChanges();
  
    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#telefono_invalido');
    if (!isValid) {
      expect(errorElement.textContent).toContain('El teléfono no es válido.');
    }
    expect(isValid).toBe(false);
  });
  
  it('debería mostrar un mensaje de error cuando el telefono no es válido', () => {
    component.usuario.telefono = '';
    component.telefonoEmpy = true;
    fixture.detectChanges();

    const errorElement: HTMLElement = fixture.nativeElement.querySelector('#telefono_empty');
    expect(errorElement.textContent).toContain('Ingrese un teléfono.');
  });

  
});
