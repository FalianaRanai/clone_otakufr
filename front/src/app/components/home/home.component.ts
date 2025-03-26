import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Episode } from '../../interfaces/episodes.interface';
import { EpisodesService } from '../../services/episodes/episodes.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private titleService: Title,
    private episodesService: EpisodesService
  ) {}

  episodes: Episode[] | undefined;
  production: boolean = environment.production;
  listeDate: Date[] = [];

  ngOnInit() : void{
    this.titleService.setTitle("OtakuFR");
    this.getHomePagination();
  }

  getHomePagination(): void {
    this.episodesService.getHomePagination(1).subscribe({
      next: (data) => {
        this.episodes = data.data;

        for (let i = 0; i < data?.data.length; i++) {
          let date = new Date(data.data[i].date_sortie);
        
          if (!this.listeDate.some(d => d.getTime() === date.getTime())) {
            this.listeDate.push(date);
          }
        }

        if (!this.production) {
          console.log('Data :', data);
          console.log('episodes :', this.episodes);
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
}
