import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarCuentaBancariaComponent } from './retirar-cuenta-bancaria.component';

describe('RetirarCuentaBancariaComponent', () => {
  let component: RetirarCuentaBancariaComponent;
  let fixture: ComponentFixture<RetirarCuentaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetirarCuentaBancariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetirarCuentaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
