import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { MediasService } from '../../../services/medias/medias.service';
import { getArrayPagination } from '../../../utils/getArrayPagination.utils';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-medias',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './medias.component.html',
  styleUrl: './medias.component.css',
})
export class MediasComponent {
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

  constructor(
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private mediaService: MediasService
  ) {}

  ngOnInit() {
    this.getPagination();
    this.initSearchForm();
  }

  getPagination(): void {
    this.isLoading = true;
    this.liste = [];

    this.mediaService.getPagination(this.current_page).subscribe({
      next: (data: any) => {
        this.liste = data.data;

        this.total_page = data.total_page;
        this.array_pagination = getArrayPagination(
          this.current_page,
          this.total_page
        );


        if (!this.production) {
          console.log('From datatable :', data);
          console.log('episodes :', this.liste);
        }

        this.isLoading = false;

        this.toastr.success('Fetch data successfully', 'Success', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true,
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
          progressBar: true,
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

  getPaginationSearch(): void {
    this.isLoading = true;
    this.liste = [];

    this.mediaService.search(this.searchControl.value, this.current_page).subscribe({
      next: (data: any) => {
        this.liste = data.data;

        this.total_page = data.total_page;
        this.array_pagination = getArrayPagination(
          this.current_page,
          this.total_page
        );


        if (!this.production) {
          console.log('From datatable :', data);
          console.log('episodes :', this.liste);
        }

        this.isLoading = false;

        this.toastr.success('Fetch data successfully', 'Success', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true,
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
          progressBar: true,
        });
      },
      complete: () => {
        if (!this.production) {
          console.log('Request executed');
        }
      },
    });
  }

  initSearchForm(): void {
  
      this.searchControl.valueChanges
        .pipe(
          debounceTime(500), // Attend 500ms après la dernière frappe
          distinctUntilChanged(), // Ne déclenche que si la valeur a changé
          switchMap((query) => this.mediaService.search(query)) // Annule la requête précédente si nouvelle valeur
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
}
