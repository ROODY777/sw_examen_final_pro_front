import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarmonedapostgreComponent } from './listarmonedapostgre.component';

describe('ListarmonedapostgreComponent', () => {
  let component: ListarmonedapostgreComponent;
  let fixture: ComponentFixture<ListarmonedapostgreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarmonedapostgreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarmonedapostgreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
