import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboarddatatableComponent } from "../../../components/dashboarddatatable/dashboarddatatable.component";
import { MediasService } from '../../../services/medias/medias.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medias',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DashboarddatatableComponent],
  templateUrl: './medias.component.html',
  styleUrl: './medias.component.css',
})
export class MediasComponent {

  mediaInterface = {
    id_media: 'number',
    titre: 'string',
    sygnopsis: 'string',
    autre_nom: 'string',
    id_type: 'number',
    date_sortie: 'date',
    duree: 'number',
    id_statut: 'number',
    affiche: 'string',
    id_realisateur: 'number',
    id_auteur: 'number',
    id_studio: 'number'
  };

  constructor(
    private mediaService: MediasService
  ) {}

  ngOnInit(): void {
  }


  getService(){
    return this.mediaService;
  }


}
