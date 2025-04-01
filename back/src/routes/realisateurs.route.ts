import { RealisateurController } from '@controllers/realisateurs.controller';
import { CreateRealisateurDto, UpdateRealisateurDto } from '@dtos/realisateurs.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class RealisateurRoute implements Routes {
  public path = '/realisateurs';
  public router = Router();
  public realisateur = new RealisateurController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.realisateur.getRealisateurs);
    this.router.get(`${this.path}/:id(\\d+)`, this.realisateur.getRealisateurById);
    this.router.get(`${this.path}/page/:page(\\d+)`, this.realisateur.getPagination);
    this.router.get(`${this.path}/search`, this.realisateur.search);

    this.router.post(`${this.path}`, ValidationMiddleware(CreateRealisateurDto), this.realisateur.createRealisateur);
    // this.router.post(`${this.path}/generate`, this.realisateur.generateRealisateur);

    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateRealisateurDto, true), this.realisateur.updateRealisateur);

    this.router.delete(`${this.path}/:id(\\d+)`, this.realisateur.deleteRealisateur);
  }
}
