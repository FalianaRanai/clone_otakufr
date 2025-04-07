import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AuteursService } from '../../../../services/auteurs/auteurs.service';
import { MediasService } from '../../../../services/medias/medias.service';
import { RealisateursService } from '../../../../services/realisateurs/realisateurs.service';
import { StatutsService } from '../../../../services/statuts/statuts.service';
import { StudiosService } from '../../../../services/studios/studios.service';
import { TypesService } from '../../../../services/types/types.service';

@Component({
  selector: 'app-modal-ajouter',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './modal-ajouter.component.html',
  styleUrl: './modal-ajouter.component.css',
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

  selectedFile: File | null = null;
  selectedFileName: string = '';

  constructor(
    private auteurService: AuteursService,
    private realisateurService: RealisateursService,
    private statutService: StatutsService,
    private studioService: StudiosService,
    private typeService: TypesService,
    private formbuilder: FormBuilder,
    private mediaService: MediasService
  ) {}

  ngOnInit(): void {
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
          console.log(
            'From getPaginationRealisateur :',
            this.realisateurOptions
          );
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
    this.addForm = this.formbuilder.group({
      titre: [this.production ? '' : 'Titre', [Validators.required]],
      autre_nom: [this.production ? '' : 'Autre Nom', [Validators.required]],
      sygnopsis: [this.production ? '' : 'Sygnopsis', [Validators.required]],
      date_sortie: [
        this.formatDateForInput(new Date().toISOString()),
        [Validators.required],
      ],
      affiche: [null], // On garde le contrôle mais sans validation requise
      duree: [
        this.production ? 24 : 1,
        [Validators.required, Validators.min(1)],
      ],
      id_auteur: [0, [Validators.required]],
      id_realisateur: [0, [Validators.required]],
      id_statut: [0, [Validators.required]],
      id_type: [0, [Validators.required]],
      id_studio: [0, [Validators.required]],
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
      this.addForm.patchValue({
        affiche: file,
      });
    }
  }

  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset(); // Décalage horaire
    const localDate = new Date(date.getTime() - offset * 60000); // Ajustement au fuseau horaire local
    return localDate.toISOString().slice(0, 16); // Format "YYYY-MM-DDTHH:MM"
  }

  onAddSubmit(): void {
    console.log(this.addForm.value);

    if (this.addForm.invalid) {
      return;
    }

    const formData = new FormData();

    // Ajouter tous les champs du formulaire
    Object.keys(this.addForm.controls).forEach((key) => {
      if (key !== 'affiche') {
        const value = this.addForm.get(key)?.value;
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      }
    });

    // Ajouter le fichier s'il existe
    if (this.selectedFile) {
      formData.append('affiche', this.selectedFile, this.selectedFile.name);
    }

    console.log('FormData:', formData);

    this.mediaService.add(formData).subscribe(
      {
        next: (data: any) => {
          console.log('Media ajouté avec succès:', data);
          this.addForm.reset();

          this.selectedFile = null;
          this.selectedFileName = '';

        },
        error: (error: any) => {
          console.error('Erreur lors de l\'ajout du media:', error);
        },
      }
    );
  }
}
