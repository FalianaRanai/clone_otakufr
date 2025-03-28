import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Realisateur } from '../../../interfaces/realisateurs.interface';
import { RealisateursService } from '../../../services/realisateurs/realisateurs.service';

@Component({
  selector: 'app-realisateurs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './realisateurs.component.html',
  styleUrl: './realisateurs.component.css'
})
export class RealisateursComponent {

  isLoading: boolean = false;
  listeRealisateurs: Realisateur[] = [];
  current_page: number = 1;
  total_page: number = 0;
  array_pagination: number[] = [];

  constructor(private realisateurService: RealisateursService){
    this.getRealisateurs();
  }

  getRealisateurs():void{
    this.isLoading = true;

    this.realisateurService.getRealisateurs().subscribe({
      next: (data) => {
        console.log(data);
        this.listeRealisateurs = data.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });

  }

  getArrayPagination(page: number) {
    // 0 correspond aux ""...""
    // Toujours les 3 premières pages

    let array_debut = [];
    for (let i = 1; i <= 3; i++) {
      if (i <= this.total_page) {
        array_debut.push(i);
      }
    }

    // Toujours les dernières premières pages
    let array_fin = [];
    for (let i = this.total_page - 3; i <= this.total_page; i++) {
      if (i > 0) {
        array_fin.push(i);
      }
    }

    // Les "..." du MILIEU
    let array_milieu = [];
    // Si la distance entre page et le dernier nombre de array_debut >= 3 on met un "..."
    if (page - array_debut[array_debut.length - 1] >= 3) {
      array_milieu.push(0);
    }

    // On genere toujours page -1 | page | page + 1
    page - 1 > 0 ? array_milieu.push(page - 1) : null;
    array_milieu.push(page);
    page + 1 <= this.total_page ? array_milieu.push(page + 1) : null;

    // Si la distance entre page et le premier nombre de array_fin >= 3 on met un "..."
    if (array_fin[0] - page >= 3) {
      array_milieu.push(0);
    }

    let array_total: number[] = [];
    for (let i = 0; i < array_debut.length; i++) {
      if (array_total.indexOf(array_debut[i]) == -1) {
        array_total.push(array_debut[i]);
      }
      else{
        if(array_debut[i] == 0){
          array_total.push(array_debut[i]);
        }
      }
    }
    for (let i = 0; i < array_milieu.length; i++) {
      if (array_total.indexOf(array_milieu[i]) == -1) {
        array_total.push(array_milieu[i]);
      }
      else{
        if(array_milieu[i] == 0){
          array_total.push(array_milieu[i]);
        }
      }
    }
    for (let i = 0; i < array_fin.length; i++) {
      if (array_total.indexOf(array_fin[i]) == -1) {
        array_total.push(array_fin[i]);
      }
      else{
        if(array_fin[i] == 0){
          array_total.push(array_fin[i]);
        }
      }
    }
    console.log('+++++++++++++++++', array_total);

    return array_total;
  }

}
