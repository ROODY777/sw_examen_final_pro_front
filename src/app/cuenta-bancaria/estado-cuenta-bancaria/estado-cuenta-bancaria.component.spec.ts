import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCuentaBancariaComponent } from './estado-cuenta-bancaria.component';

describe('EstadoCuentaBancariaComponent', () => {
  let component: EstadoCuentaBancariaComponent;
  let fixture: ComponentFixture<EstadoCuentaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoCuentaBancariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoCuentaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
