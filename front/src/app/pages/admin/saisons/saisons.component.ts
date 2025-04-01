import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboarddatatableComponent } from "../../../components/dashboarddatatable/dashboarddatatable.component";
import { SaisonsService } from '../../../services/saisons/saisons.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-saisons',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DashboarddatatableComponent],
  templateUrl: './saisons.component.html',
  styleUrl: './saisons.component.css',
})
export class SaisonsComponent {

  saisonInterface = {
    id_saison: 'number',
    numero: 'number',
    id_media: 'number'
  };

  constructor(
    private saisonService: SaisonsService
  ) {}

  ngOnInit(): void {
  }


  getService(){
    return this.saisonService;
  }


}
