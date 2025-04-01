import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboarddatatableComponent } from "../../../components/dashboarddatatable/dashboarddatatable.component";
import { StudiosService } from '../../../services/studios/studios.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-studios',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DashboarddatatableComponent],
  templateUrl: './studios.component.html',
  styleUrl: './studios.component.css',
})
export class StudiosComponent {

  studioInterface = {
    id_studio: 'number',
    nom_studio: 'string'
  };

  constructor(
    private studioService: StudiosService
  ) {}

  ngOnInit(): void {
  }


  getService(){
    return this.studioService;
  }


}
