import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Media } from '../../../interfaces/medias.interface';
import { OrdinalDatePipe } from '../../../pipes/ordinal.pipe';
import { MediasService } from '../../../services/medias/medias.service';

@Component({
  selector: 'app-fiche',
  standalone: true,
  imports: [RouterModule, OrdinalDatePipe, CommonModule],
  templateUrl: './fiche.component.html',
  styleUrl: './fiche.component.css',
})
export class FicheComponent {
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private mediasService: MediasService,
    private titleService: Title
  ) {}

  id = Number(this.activeRoute.snapshot.paramMap.get('id'));
  media: Media | undefined;
  production: boolean = environment.production;
  isLoading: boolean = false;

  ngOnInit(): void {
    this.findMediaByIdJoin(this.id);
    this.titleService.setTitle('Nouveau titre de la page');
  }

  findMediaByIdJoin(id: number): void {
    this.isLoading = true;
    this.mediasService.findMediaByIdJoin(id).subscribe({
      next: (data) => {
        this.media = data.data;
        this.titleService.setTitle(data.data.titre);

        if (!this.production) {
          console.log('Data :', data);
          console.log('Media :', this.media);
        }
        this.isLoading = false;
      },
      error: (error) => {
        if (!this.production) {
          console.error('Error :', error);
        }
        this.isLoading = false;
      },
      complete: () => {
        if (!this.production) {
          console.log('Request executed');
        }
      },
    });
  }
}
