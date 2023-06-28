import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizardeudorComponent } from './actualizardeudor.component';

describe('ActualizardeudorComponent', () => {
  let component: ActualizardeudorComponent;
  let fixture: ComponentFixture<ActualizardeudorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizardeudorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizardeudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
