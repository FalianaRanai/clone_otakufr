import { Route } from "@angular/router";
import { AuthGuard } from "../../guards/auth/auth.guard";
import { DashboardComponent } from "../../pages/admin/dashboard/dashboard.component";
import { LoginComponent } from "../../pages/admin/login/login.component";
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
  }
];