import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Media } from '../../../../interfaces/medias.interface';

@Component({
  selector: 'app-modal-supprimer',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal-supprimer.component.html',
  styleUrl: './modal-supprimer.component.css'
})
export class ModalSupprimerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public media: Media) {}

  ngOnInit() {
    // console.log('Media reçu dans le modal :', this.media);
  }

}
