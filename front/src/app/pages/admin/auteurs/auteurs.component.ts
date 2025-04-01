import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboarddatatableComponent } from "../../../components/dashboarddatatable/dashboarddatatable.component";
import { AuteursService } from '../../../services/auteurs/auteurs.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auteurs',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DashboarddatatableComponent],
  templateUrl: './auteurs.component.html',
  styleUrl: './auteurs.component.css',
})
export class AuteursComponent {

  auteurInterface = {
    id_auteur: 'number',
    nom_auteur: 'string'
  };

  constructor(
    private auteurService: AuteursService
  ) {}

  ngOnInit(): void {
  }


  getService(){
    return this.auteurService;
  }


}
