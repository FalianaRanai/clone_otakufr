import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
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
  apiUrl: string = environment.apiUrl;
  errorMessage: string = '';

  updateForm!: FormGroup;
  addForm!: FormGroup;

  searchControl = new FormControl('');

  constructor(private formbuilder: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.getPagination();
    this.initSearchForm();
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

        this.toastr.success("Fetch data successfully",'Success', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true
        });
      },
      error: (error: any) => {
        if (!this.production) {
          console.error('Error :', error);
        }
        this.isLoading = false;

        this.toastr.error(error.error.message, 'Error', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true
        });
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
    if (this.searchControl.value == '') {
      this.getPagination();
    } else {
      this.getPaginationSearch();
    }
  }

  getListeColonne(element: any) {
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
    for (let i = 0; i < this.listeColonne.length; i++) {
      if (this.interface[this.listeColonne[i]]) {
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
      console.error(
        'Les tableaux listeColonne et listeColonneType doivent avoir la même longueur.'
      );
      return;
    }

    for (let i = 0; i < this.listeColonne.length; i++) {
      const colonne = this.listeColonne[i];
      const type = this.listeColonneType[i];

      // Pour les champs de type 'number'
      if (type === 'number') {
        this.updateForm.addControl(
          colonne,
          this.formbuilder.control(0, [Validators.required])
        );
      }

      // Pour les champs de type 'string'
      if (type === 'string') {
        this.updateForm.addControl(
          colonne,
          this.formbuilder.control('', [Validators.required])
        );
      }

      // Pour les champs de type 'date'
      if (type === 'date') {
        this.updateForm.addControl(
          colonne,
          this.formbuilder.control(this.formatDateForInput(new Date().toISOString()), [Validators.required])
        );
      }
    }
  }

  initAddForm(): void {
    this.addForm = this.formbuilder.group({});

    // Vérification que listeColonne et listeColonneType ont la même longueur
    if (this.listeColonne.length !== this.listeColonneType.length) {
      console.error(
        'Les tableaux listeColonne et listeColonneType doivent avoir la même longueur.'
      );
      return;
    }

    for (let i = 1; i < this.listeColonne.length; i++) {
      const colonne = this.listeColonne[i];
      const type = this.listeColonneType[i];


      // Pour les champs de type 'number'
      if (type === 'number') {
        this.addForm.addControl(
          colonne,
          this.formbuilder.control(0, [Validators.required])
        );
      }

      // Pour les champs de type 'string'
      if (type === 'string') {
        this.addForm.addControl(
          colonne,
          this.formbuilder.control('', [Validators.required])
        );
      }

      // Pour les champs de type 'string'
      if (type === 'date') {
        const current_date = new Date();


        this.addForm.addControl(
          colonne,
          this.formbuilder.control(this.formatDateForInput(current_date.toISOString()), [Validators.required])
        );
      }
    }

  }

  onModalUpdateOpen(element: any): void {
    for (let i = 0; i < this.listeColonne.length; i++) {
      if(this.listeColonneType[i] == "date"){
        this.updateForm
        .get(this.listeColonne[i])
        ?.setValue(this.formatDateForInput((element[this.listeColonne[i]])));
      }
      else{
        this.updateForm
        .get(this.listeColonne[i])
        ?.setValue(element[this.listeColonne[i]]);
      }
    }

    console.log(this.updateForm.value);
  }

  onUpdateSubmit(id: any): void {
    console.log(this.updateForm.value);

    if (this.updateForm.invalid) {
      this.errorMessage = 'Veuillez corriger les erreurs du formulaire.';
      return;
    }

    this.isLoading = true;
    closeAllModals();

    this.service.update(id, this.updateForm.value).subscribe({
      next: (data: any) => {
        this.getPagination();
        console.log('Data :', data);
        this.isLoading = false;

        this.toastr.success("Data Updated Successfully", 'Success', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true
        });

      },
      error: (error: any) => {
        if (!this.production) {
          console.error('Error :', error);
        }
        this.isLoading = false;

        this.toastr.error(error.error.message, 'Error', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true
        });

      },
    });
  }

  onAddSubmit(): void {
    console.log(this.addForm.value);

    if (this.addForm.invalid) {
      this.errorMessage = 'Veuillez corriger les erreurs du formulaire.';
      return;
    }

    this.isLoading = true;
    closeAllModals();

    this.service.add(this.addForm.value).subscribe({
      next: (data: any) => {
        this.getPagination();
        console.log('Data :', data);
        this.isLoading = false;

        this.toastr.success("Data created Successfully", 'Success', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true
        });

      },
      error: (error: any) => {
        if (!this.production) {
          console.error('Error :', error);
        }
        this.isLoading = false;

        this.toastr.error(error.error.message, 'Error', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true
        });

      },
    });
  }

  onDeleteSubmit(id: number): void {
    console.log('id delete = ', id);

    this.isLoading = true;
    closeAllModals();

    this.service.delete(id).subscribe({
      next: (data: any) => {
        this.getPagination();
        console.log('Data :', data);
        this.isLoading = false;

        this.toastr.success("Date deleted Successfully", 'Success', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true
        });

      },
      error: (error: any) => {
        if (!this.production) {
          console.error('Error :', error);
        }
        this.isLoading = false;

        this.toastr.error(error.error.message, 'Error', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true
        });

      },
    });
  }

  initSearchForm(): void {

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500), // Attend 500ms après la dernière frappe
        distinctUntilChanged(), // Ne déclenche que si la valeur a changé
        switchMap((query) => this.service.search(query)) // Annule la requête précédente si nouvelle valeur
      )
      .subscribe((results: any) => {
        // Traitez les résultats ici
        console.log(results);
        const data = results.data;

        if (this.searchControl.value == '') {
          this.current_page = 1;
          this.getPagination();
        } else {
          this.current_page = 1;
          this.liste = data;
          this.total_page = results.total_page;
          this.array_pagination = getArrayPagination(
            this.current_page,
            this.total_page
          );
        }
      });
  }

  getPaginationSearch(): void {
    this.isLoading = true;
    this.liste = [];

    this.service.search(this.searchControl.value, this.current_page).subscribe({
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

        this.toastr.success("Data fetched successfully", 'Search', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true
        });

      },
      error: (error: any) => {
        if (!this.production) {
          console.error('Error :', error);
        }
        this.isLoading = false;

        this.toastr.error(error.error.message, 'Error', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true
        });

      },
      complete: () => {
        if (!this.production) {
          console.log('Request executed');
        }
      },
    });
  }


  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset(); // Décalage horaire
    const localDate = new Date(date.getTime() - offset * 60000); // Ajustement au fuseau horaire local
    return localDate.toISOString().slice(0, 16); // Format "YYYY-MM-DDTHH:MM"
  }
}
