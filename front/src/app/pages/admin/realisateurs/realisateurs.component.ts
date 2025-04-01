import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboarddatatableComponent } from "../../../components/dashboarddatatable/dashboarddatatable.component";
import { RealisateursService } from '../../../services/realisateurs/realisateurs.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-realisateurs',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DashboarddatatableComponent],
  templateUrl: './realisateurs.component.html',
  styleUrl: './realisateurs.component.css',
})
export class RealisateursComponent {

  realisateurInterface = {
    id_realisateur: 'number',
    nom_realisateur: 'string'
  };

  constructor(
    private realisateurService: RealisateursService
  ) {}

  ngOnInit(): void {
  }


  getService(){
    return this.realisateurService;
  }


}
