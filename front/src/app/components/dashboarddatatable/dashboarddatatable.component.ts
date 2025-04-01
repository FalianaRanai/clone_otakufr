import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { closeAllModals } from '../../utils/closeAllModals.utils';
import { getArrayPagination } from '../../utils/getArrayPagination.utils';

@Component({
  selector: 'app-dashboarddatatable',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './dashboarddatatable.component.html',
  styleUrl: './dashboarddatatable.component.css',
})
export class DashboarddatatableComponent {
  @Input() service: any;
  @Input() interface: any;

  isLoading: boolean = false;

  liste: any[] = [];
  listeColonne: string[] = [];
  listeColonneType: string[] = [];

  current_page: number = 1;
  total_page: number = 0;
  array_pagination: number[] = [];
  production: boolean = environment.production;
  errorMessage: string = '';

  updateForm!: FormGroup;
  addForm!: FormGroup;

  constructor(private formbuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getPagination();
  }

  getPagination(): void {
    this.isLoading = true;
    this.liste = [];

    this.service.getPagination(this.current_page).subscribe({
      next: (data: any) => {
        this.liste = data.data;
        this.total_page = data.total_page;
        this.array_pagination = getArrayPagination(
          this.current_page,
          this.total_page
        );

        this.listeColonne = this.getListeColonne(this.liste[0]);
        this.listeColonneType = this.getListeColonneType();
        this.initUpdateForm();
        this.initAddForm();

        if (!this.production) {
          console.log('From dashborad datatable :', data);
          console.log('episodes :', this.liste);
        }

        this.isLoading = false;
      },
      error: (error: any) => {
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

  changePage(page: number): void {
    this.current_page = page;
    this.getPagination();
  }

  getListeColonne(element:any){
    const keys = Object.keys(element);
    let temp = [];
    for (let key of keys) {
      if (key != 'created_at' && key != 'updated_at') {
        temp.push(key);
      }
    }
    console.log(`getListeColonne(): ${temp}`);
    return temp;
  }

  getListeColonneType(): string[] {

    let retour = [];
    for(let i = 0; i < this.listeColonne.length; i++){
      if(this.interface[this.listeColonne[i]]){
        retour.push(this.interface[this.listeColonne[i]]);
      }
    }
    console.log(`getListeColonneType(): ${retour}`);
    return retour;
  }

  initUpdateForm(): void {
    this.updateForm = this.formbuilder.group({});
  
    // Vérification que listeColonne et listeColonneType ont la même longueur
    if (this.listeColonne.length !== this.listeColonneType.length) {
      console.error("Les tableaux listeColonne et listeColonneType doivent avoir la même longueur.");
      return;
    }
  
    for (let i = 0; i < this.listeColonne.length; i++) {
      const colonne = this.listeColonne[i];
      const type = this.listeColonneType[i];
  
      // Pour les champs de type 'number'
      if (type === "number") {
        this.updateForm.addControl(colonne, this.formbuilder.control(0, [Validators.required]));
      }
  
      // Pour les champs de type 'string'
      if (type === "string") {
        this.updateForm.addControl(colonne, this.formbuilder.control('', [Validators.required]));
      }
    }
  }

  initAddForm(): void {
    this.addForm = this.formbuilder.group({});
  
    // Vérification que listeColonne et listeColonneType ont la même longueur
    if (this.listeColonne.length !== this.listeColonneType.length) {
      console.error("Les tableaux listeColonne et listeColonneType doivent avoir la même longueur.");
      return;
    }
  
    for (let i = 1; i < this.listeColonne.length; i++) {
      const colonne = this.listeColonne[i];
      const type = this.listeColonneType[i];
  
      // Pour les champs de type 'number'
      if (type === "number") {
        this.addForm.addControl(colonne, this.formbuilder.control(0, [Validators.required]));
      }
  
      // Pour les champs de type 'string'
      if (type === "string") {
        this.addForm.addControl(colonne, this.formbuilder.control('', [Validators.required]));
      }
    }
  }
  

  onModalUpdateOpen(element:any): void {
    for(let i = 0; i < this.listeColonne.length; i++){
      this.updateForm.get(this.listeColonne[i])?.setValue(element[this.listeColonne[i]]);
    }
  }

  onUpdateSubmit(id: any):void{
      console.log(this.updateForm.value);
  
      if (this.updateForm.invalid) {
        this.errorMessage = 'Veuillez corriger les erreurs du formulaire.';
        return;
      }
  
      this.isLoading = true;
      closeAllModals();
  
      this.service.update(id, this.updateForm.value).subscribe({
        next: (data:any) => {
          this.getPagination();
          console.log('Data :', data);
          this.isLoading = false;
        },
        error: (error:any) => {
          if (!this.production) {
            console.error('Error :', error);
          }
          this.isLoading = false;
        }
      });
    }

    onAddSubmit():void{
      console.log(this.addForm.value);

      if (this.addForm.invalid) {
        this.errorMessage = 'Veuillez corriger les erreurs du formulaire.';
        return;
      }
  
      this.isLoading = true;
      closeAllModals();
  
      this.service.add(this.addForm.value).subscribe({
        next: (data:any) => {
          this.getPagination();
          console.log('Data :', data);
          this.isLoading = false;
        },
        error: (error:any) => {
          if (!this.production) {
            console.error('Error :', error);
          }
          this.isLoading = false;
        }
      });
    }

}
