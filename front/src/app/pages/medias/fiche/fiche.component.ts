import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Media } from '../../../interfaces/medias.interface';
import { MediasService } from '../../../services/medias/medias.service';

@Component({
  selector: 'app-fiche',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './fiche.component.html',
  styleUrl: './fiche.component.css',
})
export class FicheComponent {
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private mediasService: MediasService
  ) {}

  id = Number(this.activeRoute.snapshot.paramMap.get('id'));
  media: Media | undefined;
  production: boolean = environment.production;

  ngOnInit(): void {
    this.findMediaByIdJoin(this.id);
  }

  findMediaByIdJoin(id: number): void {
    this.mediasService.findMediaByIdJoin(id).subscribe({
      next: (data) => {
        this.media = data.data;

        if (!this.production) {
          console.log('Data :', data);
          console.log('Media :', this.media);
        }
      },
      error: (error) => {
        if (!this.production) {
          console.error('Error :', error);
        }
      },
      complete: () => {
        if (!this.production) {
          console.log('Request executed');
        }
      },
    });
  }
}
