import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrardeudorComponent } from './registrardeudor.component';

describe('RegistrardeudorComponent', () => {
  let component: RegistrardeudorComponent;
  let fixture: ComponentFixture<RegistrardeudorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrardeudorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrardeudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
