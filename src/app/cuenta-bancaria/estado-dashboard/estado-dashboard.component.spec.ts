import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoDashboardComponent } from './estado-dashboard.component';

describe('EstadoDashboardComponent', () => {
  let component: EstadoDashboardComponent;
  let fixture: ComponentFixture<EstadoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
