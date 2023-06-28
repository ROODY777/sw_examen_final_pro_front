import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListainversionesComponent } from './listainversiones.component';

describe('ListainversionesComponent', () => {
  let component: ListainversionesComponent;
  let fixture: ComponentFixture<ListainversionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListainversionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListainversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
