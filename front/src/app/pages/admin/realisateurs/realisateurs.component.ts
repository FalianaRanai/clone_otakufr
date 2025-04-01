import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { DashboarddatatableComponent } from "../../../components/dashboarddatatable/dashboarddatatable.component";
import { Realisateur } from '../../../interfaces/realisateurs.interface';
import { RealisateursService } from '../../../services/realisateurs/realisateurs.service';
import { closeAllModals } from '../../../utils/closeAllModals.utils';
import { getArrayPagination } from '../../../utils/getArrayPagination.utils';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-realisateurs',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DashboarddatatableComponent],
  templateUrl: './realisateurs.component.html',
  styleUrl: './realisateurs.component.css',
})
export class RealisateursComponent {
  isLoading: boolean = false;
  liste: Realisateur[] = [];
  current_page: number = 1;
  total_page: number = 0;
  array_pagination: number[] = [];
  production: boolean = environment.production;
  errorMessage:string = '';

  realisateurInterface = {
    id_realisateur: 'number',
    nom_realisateur: 'string'
  };

  updateForm: FormGroup = this.formbuilder.group({
    nom_realisateur: ['', [Validators.required]],
    id_realisateur: [0, [Validators.required]],
  });

  constructor(
    private realisateurService: RealisateursService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getHomePagination();
  }

  changePage(page: number): void {
    this.current_page = page;
    this.getHomePagination();
  }

  getHomePagination(): void {
    // EN GROS FAUT VIDER AVANT DEFAIRE ENTRER
    this.isLoading = true;
    this.liste = [];

    this.realisateurService.getPagination(this.current_page).subscribe({
      next: (data) => {
        this.liste = data.data;
        this.total_page = data.total_page;
        this.array_pagination = getArrayPagination(
          this.current_page,
          this.total_page
        );

        if (!this.production) {
          console.log('Data :', data);
          console.log('episodes :', this.liste);
        }

        this.isLoading = false;
      },
      error: (error) => {
        if (!this.production) {
          console.error('Error :', error);
        }
        this.isLoading = false;
      },
      complete: () => {
        if (!this.production) {
          console.log('Request executed');
        }
      },
    });
  }

  onUpdateSubmit(id_realisateur: any):void{
    console.log(this.updateForm.value);

    if (this.updateForm.invalid) {
      this.errorMessage = 'Veuillez corriger les erreurs du formulaire.';
      return;
    }

    this.isLoading = true;
    closeAllModals();

    this.realisateurService.update(id_realisateur, this.updateForm.value).subscribe({
      next: (data) => {
        this.getHomePagination();
        console.log('Data :', data);
        this.isLoading = false;
      },
      error: (error) => {
        if (!this.production) {
          console.error('Error :', error);
        }
        this.isLoading = false;
      }
    });
  }

  onModalOpen(realisateur:Realisateur): void {
    this.updateForm.get('id_realisateur')?.setValue(realisateur.id_realisateur);
    this.updateForm.get('nom_realisateur')?.setValue(realisateur.nom_realisateur);
  }

  getService(){
    return this.realisateurService;
  }


}
