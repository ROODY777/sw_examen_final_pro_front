import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCuentabancariaComponent } from './listar-cuentabancaria.component';

describe('ListarCuentabancariaComponent', () => {
  let component: ListarCuentabancariaComponent;
  let fixture: ComponentFixture<ListarCuentabancariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCuentabancariaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCuentabancariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
