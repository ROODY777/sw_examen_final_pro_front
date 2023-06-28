import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizapostgreComponent } from './actualizapostgre.component';

describe('ActualizapostgreComponent', () => {
  let component: ActualizapostgreComponent;
  let fixture: ComponentFixture<ActualizapostgreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizapostgreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizapostgreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
