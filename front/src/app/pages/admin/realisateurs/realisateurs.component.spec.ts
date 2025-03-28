import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisateursComponent } from './realisateurs.component';

describe('RealisateursComponent', () => {
  let component: RealisateursComponent;
  let fixture: ComponentFixture<RealisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealisateursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
