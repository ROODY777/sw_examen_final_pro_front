import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearmonedaporstreComponent } from './crearmonedaporstre.component';

describe('CrearmonedaporstreComponent', () => {
  let component: CrearmonedaporstreComponent;
  let fixture: ComponentFixture<CrearmonedaporstreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearmonedaporstreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearmonedaporstreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
