import { Route } from "@angular/router";
import { FicheComponent } from "../pages/medias/fiche/fiche.component";

export const MEDIAS_ROUTES: Route[] = [
  {
    path: ":id",
    component: FicheComponent,
  }
];