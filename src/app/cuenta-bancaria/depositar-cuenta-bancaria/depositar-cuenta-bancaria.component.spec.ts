import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositarCuentaBancariaComponent } from './depositar-cuenta-bancaria.component';

describe('DepositarCuentaBancariaComponent', () => {
  let component: DepositarCuentaBancariaComponent;
  let fixture: ComponentFixture<DepositarCuentaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositarCuentaBancariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositarCuentaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
