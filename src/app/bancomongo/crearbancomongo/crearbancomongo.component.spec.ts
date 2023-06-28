import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearbancomongoComponent } from './crearbancomongo.component';

describe('CrearbancomongoComponent', () => {
  let component: CrearbancomongoComponent;
  let fixture: ComponentFixture<CrearbancomongoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearbancomongoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearbancomongoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
