import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesubastaComponent } from './detallesubasta.component';

describe('DetallesubastaComponent', () => {
  let component: DetallesubastaComponent;
  let fixture: ComponentFixture<DetallesubastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesubastaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesubastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
