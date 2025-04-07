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
import { getAlertErrorMessage, getAlertSuccessMessage } from '../../../utils/getAlertMessage.utils';

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
        [Validators.required],
      ],
      password: [
        this.production ? '' : 'password123456789',
        [Validators.required, Validators.minLength(9)]
      ]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['error'] === 'unauthorized') {
        this.errorMessage = "Please, log in";
        getAlertErrorMessage(this.toastr, this.errorMessage, 'Error');
      }
      if (params['success'] === 'logout') {
        getAlertSuccessMessage(this.toastr, 'You have been logged out successfully', 'Success');
      }
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          getAlertSuccessMessage(this.toastr, 'Logged in successfully', 'Success');
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.message;
          getAlertErrorMessage(this.toastr, this.errorMessage);
          console.error('Login error:', err);
        },
      });
    }
  }
}
