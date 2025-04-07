import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuteursService } from '../../../../services/auteurs/auteurs.service';

@Component({
  selector: 'app-modal-ajouter',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule, NgxMatSelectSearchModule, MatSelectModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modal-ajouter.component.html',
  styleUrl: './modal-ajouter.component.css'
})
export class ModalAjouterComponent {

  addForm!: FormGroup;
  auteurSearchControl = new FormControl('');
  auteurOptions: any = [];
  production: boolean = environment.production;
  errorMessage: string = '';

  constructor(private auteurService: AuteursService, private formbuilder: FormBuilder,) {
  }

  ngOnInit(): void{
    this.initAddForm();
    this.initAuteurSearchForm();
    this.getPaginationAuteur();
  }

   initAuteurSearchForm(): void {
      this.auteurSearchControl.valueChanges
        .pipe(
          debounceTime(500), // Attend 500ms après la dernière frappe
          distinctUntilChanged(), // Ne déclenche que si la valeur a changé
          switchMap((query) => this.auteurService.search(query ? query : '')) // Annule la requête précédente si nouvelle valeur
        )
        .subscribe((results: any) => {
          // Traitez les résultats ici
          console.log(results);
  
          if (this.auteurSearchControl.value == '') {
            this.getPaginationAuteur();
          } else {
            this.auteurOptions = results.data;
          }
        });
    }
  
    getPaginationAuteur(): void {
  
      this.auteurService.getPagination().subscribe({
        next: (data: any) => {
          this.auteurOptions = data.data;
  
          if (!this.production) {
            console.log('From getPaginationAuteur :', this.auteurOptions);
          }
  
  
          
        },
        error: (error: any) => {
          if (!this.production) {
            console.error('Error :', error);
          }
  
        },
      });
    }

    initAddForm(): void {
      this.addForm = this.formbuilder.group({});
  
      this.addForm.addControl(
        'titre',
        this.formbuilder.control(this.production ? '' : 'Titre', [Validators.required])
      );
      this.addForm.addControl(
        'autre_nom',
        this.formbuilder.control(this.production ? '' : 'Autre Nom', [Validators.required])
      );
      this.addForm.addControl(
        'sygnopsis',
        this.formbuilder.control(this.production ? '' : 'Sygnopsis', [Validators.required])
      );
      this.addForm.addControl(
        'date_sortie',
        this.formbuilder.control(
          this.formatDateForInput(new Date().toISOString()),
          [Validators.required]
        )
      );
      this.addForm.addControl(
        'affiche',
        this.formbuilder.control(this.production ? '' : 'Affiche', [Validators.required])
      );
      this.addForm.addControl(
        'duree',
        this.formbuilder.control(this.production ? 24 : 1, [Validators.required, Validators.min(1)])
      );
      this.addForm.addControl(
        'id_auteur',
        this.formbuilder.control(0, [Validators.required])
      );
      this.addForm.addControl(
        'id_realisateur',
        this.formbuilder.control(0, [Validators.required])
      );
      this.addForm.addControl(
        'id_statut',
        this.formbuilder.control(0, [Validators.required])
      );
      this.addForm.addControl(
        'id_type',
        this.formbuilder.control(0, [Validators.required])
      );
      this.addForm.addControl(
        'id_studio',
        this.formbuilder.control(0, [Validators.required])
      );
    }
  
    formatDateForInput(dateString: string): string {
      const date = new Date(dateString);
      const offset = date.getTimezoneOffset(); // Décalage horaire
      const localDate = new Date(date.getTime() - offset * 60000); // Ajustement au fuseau horaire local
      return localDate.toISOString().slice(0, 16); // Format "YYYY-MM-DDTHH:MM"
    }
  
    onAddSubmit(): void {
      console.log(this.addForm.value);
    }
}
