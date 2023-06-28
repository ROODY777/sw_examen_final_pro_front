import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBancariaCardComponent } from './cuenta-bancaria-card.component';

describe('CuentaBancariaCardComponent', () => {
  let component: CuentaBancariaCardComponent;
  let fixture: ComponentFixture<CuentaBancariaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaBancariaCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaBancariaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
