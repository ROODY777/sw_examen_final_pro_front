import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarbancomongoComponent } from './listarbancomongo.component';

describe('ListarbancomongoComponent', () => {
  let component: ListarbancomongoComponent;
  let fixture: ComponentFixture<ListarbancomongoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarbancomongoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarbancomongoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
