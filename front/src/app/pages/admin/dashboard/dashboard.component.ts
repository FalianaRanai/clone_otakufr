import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  user:any = null;
  isSidebarVisible = true;

  constructor(private authService: AuthService) {
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  ngOnInit():void{
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.user);
  }

  logout() {
    this.authService.logout();
  }
}
