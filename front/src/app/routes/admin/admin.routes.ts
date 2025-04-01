import { Route } from "@angular/router";
import { AuthGuard } from "../../guards/auth/auth.guard";
import { DashboardComponent } from "../../pages/admin/dashboard/dashboard.component";
import { LoginComponent } from "../../pages/admin/login/login.component";
import { AUTEURS_ROUTES } from "./auteurs.routes";
import { EPISODES_ROUTES } from "./episodes.routes";
import { REALISATEURS_ROUTES } from "./realisateurs.routes";

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
  }
];