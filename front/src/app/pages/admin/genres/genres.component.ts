import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboarddatatableComponent } from "../../../components/dashboarddatatable/dashboarddatatable.component";
import { GenresService } from '../../../services/genres/genres.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DashboarddatatableComponent],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css',
})
export class GenresComponent {

  genreInterface = {
    id_genre: 'number',
    nom_genre: 'string'
  };

  constructor(
    private genreService: GenresService
  ) {}

  ngOnInit(): void {
  }


  getService(){
    return this.genreService;
  }


}
