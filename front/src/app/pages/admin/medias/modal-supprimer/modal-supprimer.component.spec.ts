import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSupprimerComponent } from './modal-supprimer.component';

describe('ModalSupprimerComponent', () => {
  let component: ModalSupprimerComponent;
  let fixture: ComponentFixture<ModalSupprimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSupprimerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSupprimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
