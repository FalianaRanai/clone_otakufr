import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboarddatatableComponent } from "../../../components/dashboarddatatable/dashboarddatatable.component";
import { StatutsService } from '../../../services/statuts/statuts.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-statuts',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DashboarddatatableComponent],
  templateUrl: './statuts.component.html',
  styleUrl: './statuts.component.css',
})
export class StatutsComponent {

  statutInterface = {
    id_statut: 'number',
    nom_statut: 'string'
  };

  constructor(
    private statutService: StatutsService
  ) {}

  ngOnInit(): void {
  }


  getService(){
    return this.statutService;
  }


}
