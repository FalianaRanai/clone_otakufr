import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
  currentRoute: string = '';
  currentYear:number = new Date().getFullYear();

  isRealisateurActive: boolean = false;
  iEpisodeActive: boolean = false;
  isAuteursActive: boolean = false;
  isStudioActive: boolean = false

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit():void{
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(this.user);

    this.currentRoute = this.router.url;
    console.log(this.currentRoute);
    this.collapseSidebarMenu();

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      console.log("changement de route", this.currentRoute);
      this.collapseSidebarMenu();
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    this.authService.logout();
  }

  collapseSidebarMenu():void {

    if(this.currentRoute.includes("realisateurs")){
      const button = document.getElementById('dashboard_realisateur_sidebar_menu_button');
      if (button) {
        button.click();
        this.isRealisateurActive = true;
      }
    }
    else{
      this.isRealisateurActive = false;
    }

    if(this.currentRoute.includes("episodes")){
      const button = document.getElementById('dashboard_episode_sidebar_menu_button');
      if (button) {
        button.click();
        this.iEpisodeActive = true;
      }
    }
    else{
      this.iEpisodeActive = false;
    }

    if(this.currentRoute.includes("auteurs")){
      const button = document.getElementById('dashboard_auteur_sidebar_menu_button');
      if (button) {
        button.click();
        this.isAuteursActive = true;
      }
    }
    else{
      this.isAuteursActive = false;
    }

    if(this.currentRoute.includes("studios")){
      const button = document.getElementById('dashboard_studio_sidebar_menu_button');
      if (button) {
        button.click();
        this.isStudioActive = true;
      }
    }
    else{
      this.isStudioActive = false;
    }


  }
}
