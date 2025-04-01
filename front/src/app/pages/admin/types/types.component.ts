import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboarddatatableComponent } from "../../../components/dashboarddatatable/dashboarddatatable.component";
import { TypesService } from '../../../services/types/types.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DashboarddatatableComponent],
  templateUrl: './types.component.html',
  styleUrl: './types.component.css',
})
export class TypesComponent {

  typeInterface = {
    id_type: 'number',
    nom_type: 'string'
  };

  constructor(
    private typeService: TypesService
  ) {}

  ngOnInit(): void {
  }


  getService(){
    return this.typeService;
  }


}
