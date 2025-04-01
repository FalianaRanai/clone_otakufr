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
  isStudioActive: boolean = false;
  isSaisonActive: boolean = false;
  isGenreActive: boolean = false;
  isStatutActive: boolean = false;
  isTypeActive: boolean = false;
  isMediaActive: boolean = false;

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

    if(this.currentRoute.includes("saisons")){
      const button = document.getElementById('dashboard_saison_sidebar_menu_button');
      if (button) {
        button.click();
        this.isSaisonActive = true;
      }
    }
    else{
      this.isSaisonActive = false;
    }

    if(this.currentRoute.includes("genres")){
      const button = document.getElementById('dashboard_genre_sidebar_menu_button');
      if (button) {
        button.click();
        this.isGenreActive = true;
      }
    }
    else{
      this.isGenreActive = false;
    }

    if(this.currentRoute.includes("statuts")){
      const button = document.getElementById('dashboard_statut_sidebar_menu_button');
      if (button) {
        button.click();
        this.isStatutActive = true;
      }
    }
    else{
      this.isStatutActive = false;
    }

    if(this.currentRoute.includes("types")){
      const button = document.getElementById('dashboard_type_sidebar_menu_button');
      if (button) {
        button.click();
        this.isTypeActive = true;
      }
    }
    else{
      this.isTypeActive = false;
    }

    if(this.currentRoute.includes("medias")){
      const button = document.getElementById('dashboard_media_sidebar_menu_button');
      if (button) {
        button.click();
        this.isMediaActive = true;
      }
    }
    else{
      this.isMediaActive = false;
    }


  }
}
