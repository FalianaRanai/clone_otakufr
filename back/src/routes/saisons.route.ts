import { SaisonController } from '@controllers/saisons.controller';
import { CreateSaisonDto, UpdateSaisonDto } from '@dtos/saisons.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class SaisonRoute implements Routes {
  public path = '/saisons';
  public router = Router();
  public saison = new SaisonController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.saison.getSaisons);
    this.router.get(`${this.path}/:id(\\d+)`, this.saison.getSaisonById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateSaisonDto), this.saison.createSaison);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateSaisonDto, true), this.saison.updateSaison);
    this.router.delete(`${this.path}/:id(\\d+)`, this.saison.deleteSaison);
  }
}
