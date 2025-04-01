import { Route } from "@angular/router";
import { AuthGuard } from "../../guards/auth/auth.guard";
import { DashboardComponent } from "../../pages/admin/dashboard/dashboard.component";
import { LoginComponent } from "../../pages/admin/login/login.component";
import { AUTEURS_ROUTES } from "./auteurs.routes";
import { EPISODES_ROUTES } from "./episodes.routes";
import { GENRES_ROUTES } from "./genres.routes";
import { MEDIAS_ROUTES } from "./medias.routes";
import { REALISATEURS_ROUTES } from "./realisateurs.routes";
import { SAISONS_ROUTES } from "./saisons.routes";
import { STATUTS_ROUTES } from "./statuts.routes";
import { STUDIOS_ROUTES } from "./studios.routes";
import { TYPES_ROUTES } from "./types.routes";

export const ADMIN_ROUTES: Route[] = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "realisateurs", 
    component: DashboardComponent,
    children: REALISATEURS_ROUTES  
  },
  {
    path: "episodes", 
    component: DashboardComponent,
    children: EPISODES_ROUTES  
  },
  {
    path: "auteurs",
    component: DashboardComponent,
    children: AUTEURS_ROUTES  
  },
  {
    path: "studios",
    component: DashboardComponent,
    children: STUDIOS_ROUTES  
  },
  {
    path: "saisons",
    component: DashboardComponent,
    children: SAISONS_ROUTES  
  },
  {
    path: "genres",
    component: DashboardComponent,
    children: GENRES_ROUTES  
  },
  {
    path: "statuts",
    component: DashboardComponent,
    children: STATUTS_ROUTES  
  },
  {
    path: "types",
    component: DashboardComponent,
    children: TYPES_ROUTES  
  },
  {
    path: "medias",
    component: DashboardComponent,
    children: MEDIAS_ROUTES  
  }
];