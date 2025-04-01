import { Component } from '@angular/core';
import { DashboarddatatableComponent } from "../../../components/dashboarddatatable/dashboarddatatable.component";
import { EpisodesService } from '../../../services/episodes/episodes.service';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [DashboarddatatableComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent {
  episodeInterface = {
    id_episode: 'number',
    nom_episode: 'string',
    numero: "number",
    id_media: "number",
    date_sortie: "date"
  };

  constructor(
      private episodeService: EpisodesService
    ) {}
  
    ngOnInit(): void {
    }
  
  
    getService(){
      return this.episodeService;
    }
}
