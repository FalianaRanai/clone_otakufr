import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Episode } from '../../interfaces/episodes.interface';
import { EpisodesService } from '../../services/episodes/episodes.service';
import { getArrayPagination } from '../../utils/getArrayPagination.utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private titleService: Title,
    private episodesService: EpisodesService,
    private activeRoute: ActivatedRoute
  ) {}

  episodes: Episode[] | undefined;
  production: boolean = environment.production;
  listeDate: Date[] = [];
  current_page: number = 1;
  total_page: number = 0;
  array_pagination: number[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      
      const page = Number(params.get('page')); 
      this.current_page = page ? page : 1;
      this.getHomePagination();
      
      
    });

    this.titleService.setTitle('OtakuFR');
  }

  getArray(length: number): number[] {
    return Array.from({ length }, (_, i) => i);
  }

  getHomePagination(): void {

    // EN GROS FAUT VIDER AVANT DEFAIRE ENTRER
    this.isLoading = true;
    this.episodes = [];
    this.listeDate = [];

    this.episodesService.getHomePagination(this.current_page).subscribe({
      next: (data) => {


        this.episodes = data.data;
        this.total_page = data.total_page;
        this.array_pagination = getArrayPagination(this.current_page, this.total_page);

        for (let i = 0; i < data?.data.length; i++) {
          let date = new Date(data.data[i].date_sortie);

          if (!this.listeDate.some((d) => d.getTime() === date.getTime())) {
            this.listeDate.push(date);
          }
        }

        if (!this.production) {
          console.log('Data :', data);
          console.log('episodes :', this.episodes);
          console.log(`dates: ${this.listeDate}`);
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
