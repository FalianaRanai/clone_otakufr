import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboarddatatableComponent } from './dashboarddatatable.component';

describe('DashboarddatatableComponent', () => {
  let component: DashboarddatatableComponent;
  let fixture: ComponentFixture<DashboarddatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboarddatatableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboarddatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
