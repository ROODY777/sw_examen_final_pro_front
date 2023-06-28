import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarsubastaComponent } from './listarsubasta.component';

describe('ListarsubastaComponent', () => {
  let component: ListarsubastaComponent;
  let fixture: ComponentFixture<ListarsubastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarsubastaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarsubastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
