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
import { RealisateursService } from '../../../../services/realisateurs/realisateurs.service';
import { StatutsService } from '../../../../services/statuts/statuts.service';
import { StudiosService } from '../../../../services/studios/studios.service';
import { TypesService } from '../../../../services/types/types.service';

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

  
  production: boolean = environment.production;
  errorMessage: string = '';

  auteurSearchControl = new FormControl('');
  auteurOptions: any = [];

  realisateurSearchControl = new FormControl('');
  realisateurOptions: any = [];

  statutSearchControl = new FormControl('');
  statutOptions: any = [];

  studioSearchControl = new FormControl('');
  studioOptions: any = [];

  typeSearchControl = new FormControl('');
  typeOptions: any = [];

  constructor(private auteurService: AuteursService, 
    private realisateurService: RealisateursService,
    private statutService: StatutsService,
    private studioService: StudiosService,
    private typeService: TypesService,
    private formbuilder: FormBuilder,) {
  }

  ngOnInit(): void{
    this.initAddForm();

    this.getPaginationAuteur();
    this.getPaginationRealisateur();
    this.getPaginationStatut();
    this.getPaginationStudio();
    this.getPaginationType();

    this.initAuteurSearchForm();
    this.initRealisateurSearchForm();
    this.initStatutSearchForm();
    this.initStudioSearchForm();
    this.initTypeSearchForm();
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

    getPaginationRealisateur(): void {
  
      this.realisateurService.getPagination().subscribe({
        next: (data: any) => {
          this.realisateurOptions = data.data;
  
          if (!this.production) {
            console.log('From getPaginationRealisateur :', this.realisateurOptions);
          } 
        },
        error: (error: any) => {
          if (!this.production) {
            console.error('Error :', error);
          }
  
        },
      });
    }

    initRealisateurSearchForm(): void {
      this.realisateurSearchControl.valueChanges
        .pipe(
          debounceTime(500), // Attend 500ms après la dernière frappe
          distinctUntilChanged(), // Ne déclenche que si la valeur a changé
          switchMap((query) => this.realisateurService.search(query ? query : '')) // Annule la requête précédente si nouvelle valeur
        )
        .subscribe((results: any) => {
          // Traitez les résultats ici
          console.log(results);
  
          if (this.realisateurSearchControl.value == '') {
            this.getPaginationRealisateur();
          } else {
            this.realisateurOptions = results.data;
          }
        });
    }

    getPaginationStatut(): void {
  
      this.statutService.getPagination().subscribe({
        next: (data: any) => {
          this.statutOptions = data.data;
  
          if (!this.production) {
            console.log('From getPaginationStatut :', this.statutOptions);
          } 
        },
        error: (error: any) => {
          if (!this.production) {
            console.error('Error :', error);
          }
  
        },
      });
    }

    initStatutSearchForm(): void {
      this.statutSearchControl.valueChanges
        .pipe(
          debounceTime(500), // Attend 500ms après la dernière frappe
          distinctUntilChanged(), // Ne déclenche que si la valeur a changé
          switchMap((query) => this.statutService.search(query ? query : '')) // Annule la requête précédente si nouvelle valeur
        )
        .subscribe((results: any) => {
          // Traitez les résultats ici
          console.log(results);
  
          if (this.statutSearchControl.value == '') {
            this.getPaginationStatut();
          } else {
            this.statutOptions = results.data;
          }
        });
    }

    getPaginationStudio(): void {
  
      this.studioService.getPagination().subscribe({
        next: (data: any) => {
          this.studioOptions = data.data;
  
          if (!this.production) {
            console.log('From getPaginationStudio :', this.studioOptions);
          } 
        },
        error: (error: any) => {
          if (!this.production) {
            console.error('Error :', error);
          }
  
        },
      });
    }

    initStudioSearchForm(): void {
      this.statutSearchControl.valueChanges
        .pipe(
          debounceTime(500), // Attend 500ms après la dernière frappe
          distinctUntilChanged(), // Ne déclenche que si la valeur a changé
          switchMap((query) => this.studioService.search(query ? query : '')) // Annule la requête précédente si nouvelle valeur
        )
        .subscribe((results: any) => {
          // Traitez les résultats ici
          console.log(results);
  
          if (this.statutSearchControl.value == '') {
            this.getPaginationStudio();
          } else {
            this.studioOptions = results.data;
          }
        });
    }

    getPaginationType(): void {
  
      this.typeService.getPagination().subscribe({
        next: (data: any) => {
          this.typeOptions = data.data;
  
          if (!this.production) {
            console.log('From getPaginationType :', this.typeOptions);
          } 
        },
        error: (error: any) => {
          if (!this.production) {
            console.error('Error :', error);
          }
  
        },
      });
    }

    initTypeSearchForm(): void {
      this.statutSearchControl.valueChanges
        .pipe(
          debounceTime(500), // Attend 500ms après la dernière frappe
          distinctUntilChanged(), // Ne déclenche que si la valeur a changé
          switchMap((query) => this.typeService.search(query ? query : '')) // Annule la requête précédente si nouvelle valeur
        )
        .subscribe((results: any) => {
          // Traitez les résultats ici
          console.log(results);
  
          if (this.statutSearchControl.value == '') {
            this.getPaginationType();
          } else {
            this.typeOptions = results.data;
          }
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
