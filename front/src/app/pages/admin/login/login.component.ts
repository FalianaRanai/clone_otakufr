import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  production: boolean = environment.production;
  isLoading: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formbuilder.group({
      email: [
        this.production ? '' : 'admin@email.com',
        [Validators.required, Validators.email],
      ],
      password: [
        this.production ? '' : 'password123456789',
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['error'] === 'not-authenticated') {
        this.errorMessage = "Please, log in";

        this.toastr.error(this.errorMessage,'Error', {
          positionClass: 'toast-bottom-right',
          timeOut: 5000,
          extendedTimeOut: 1000,
          tapToDismiss: true,
          closeButton: true,
          progressBar: true
        });
        
      }
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {

          this.toastr.success("Logged In successfully",'Success', {
            positionClass: 'toast-bottom-right',
            timeOut: 5000,
            extendedTimeOut: 1000,
            tapToDismiss: true,
            closeButton: true,
            progressBar: true
          });

          this.router.navigate(['/admin/dashboard']);
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err.error.message;

          this.toastr.error(this.errorMessage,'Error', {
            positionClass: 'toast-bottom-right',
            timeOut: 5000,
            extendedTimeOut: 1000,
            tapToDismiss: true,
            closeButton: true,
            progressBar: true
          });

          this.isLoading = false;
        },
      });
    }
  }
}
