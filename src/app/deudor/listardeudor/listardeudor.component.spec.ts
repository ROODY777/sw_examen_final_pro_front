import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListardeudorComponent } from './listardeudor.component';

describe('ListardeudorComponent', () => {
  let component: ListardeudorComponent;
  let fixture: ComponentFixture<ListardeudorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListardeudorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListardeudorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
