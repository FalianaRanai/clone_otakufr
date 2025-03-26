import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Episode } from '../../interfaces/episodes.interface';
import { EpisodesService } from '../../services/episodes/episodes.service';

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
      this.getCountPagination();
      
      
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

  getCountPagination(): void {
    this.episodesService.getCountPagination().subscribe({
      next: (data) => {
        this.total_page = data.data[0].count_pages;

        this.array_pagination = this.getArrayPagination(this.current_page);

        if (!this.production) {
          console.log('Data :', data);
          console.log('total_page :', this.total_page);
          console.log(`dates: ${this.listeDate}`);
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

  getArrayPagination(page: number) {
    // 0 correspond aux ""...""
    // Toujours les 3 premières pages

    let array_debut = [];
    for (let i = 1; i <= 3; i++) {
      if (i <= this.total_page) {
        array_debut.push(i);
      }
    }

    // Toujours les dernières premières pages
    let array_fin = [];
    for (let i = this.total_page - 3; i <= this.total_page; i++) {
      if (i > 0) {
        array_fin.push(i);
      }
    }

    // Les "..." du MILIEU
    let array_milieu = [];
    // Si la distance entre page et le dernier nombre de array_debut >= 3 on met un "..."
    if (page - array_debut[array_debut.length - 1] >= 3) {
      array_milieu.push(0);
    }

    // On genere toujours page -1 | page | page + 1
    page - 1 > 0 ? array_milieu.push(page - 1) : null;
    array_milieu.push(page);
    page + 1 <= this.total_page ? array_milieu.push(page + 1) : null;

    // Si la distance entre page et le premier nombre de array_fin >= 3 on met un "..."
    if (array_fin[0] - page >= 3) {
      array_milieu.push(0);
    }

    let array_total: number[] = [];
    for (let i = 0; i < array_debut.length; i++) {
      if (array_total.indexOf(array_debut[i]) == -1) {
        array_total.push(array_debut[i]);
      }
      else{
        if(array_debut[i] == 0){
          array_total.push(array_debut[i]);
        }
      }
    }
    for (let i = 0; i < array_milieu.length; i++) {
      if (array_total.indexOf(array_milieu[i]) == -1) {
        array_total.push(array_milieu[i]);
      }
      else{
        if(array_milieu[i] == 0){
          array_total.push(array_milieu[i]);
        }
      }
    }
    for (let i = 0; i < array_fin.length; i++) {
      if (array_total.indexOf(array_fin[i]) == -1) {
        array_total.push(array_fin[i]);
      }
      else{
        if(array_fin[i] == 0){
          array_total.push(array_fin[i]);
        }
      }
    }
    console.log('+++++++++++++++++', array_total);

    return array_total;
  }
}
