import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaCuentaBancariaComponent } from './transferencia-cuenta-bancaria.component';

describe('TransferenciaCuentaBancariaComponent', () => {
  let component: TransferenciaCuentaBancariaComponent;
  let fixture: ComponentFixture<TransferenciaCuentaBancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferenciaCuentaBancariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferenciaCuentaBancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
