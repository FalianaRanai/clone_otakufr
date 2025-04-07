import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Media } from '../../../../interfaces/medias.interface';
import { MediasService } from '../../../../services/medias/medias.service';
import { getAlertErrorMessage, getAlertSuccessMessage } from '../../../../utils/getAlertMessage.utils';

@Component({
  selector: 'app-modal-supprimer',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './modal-supprimer.component.html',
  styleUrl: './modal-supprimer.component.css',
})
export class ModalSupprimerComponent {

  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public media: Media,
    private mediaService: MediasService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ModalSupprimerComponent>
  ) {}

  ngOnInit() {
    // console.log('Media reçu dans le modal :', this.media);
  }

  deleteMedia() {
    if (this.media.id_media) {
      this.isLoading = true;
      this.mediaService.delete(this.media.id_media).subscribe(
        {
          next: (response) => {
            this.isLoading = false;
            console.log('Media supprimé avec succès !', response);
            getAlertSuccessMessage(this.toastr, 'Media supprimé avec succès !');
            this.dialogRef.close({
              success: true,
            }); // Ferme le modal et passe une valeur (true) au composant parent
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Erreur lors de la suppression du media :', error);
            getAlertErrorMessage(this.toastr, error.error.message);
          }
        }
      );
    }
  }
}
