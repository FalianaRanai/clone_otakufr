import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjouterComponent } from './modal-ajouter.component';

describe('ModalAjouterComponent', () => {
  let component: ModalAjouterComponent;
  let fixture: ComponentFixture<ModalAjouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAjouterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
