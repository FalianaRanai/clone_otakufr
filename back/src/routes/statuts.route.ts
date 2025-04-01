import { StatutController } from '@controllers/statuts.controller';
import { CreateStatutDto, UpdateStatutDto } from '@dtos/statuts.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class StatutRoute implements Routes {
  public path = '/statuts';
  public router = Router();
  public statut = new StatutController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.statut.getStatuts);
    this.router.get(`${this.path}/:id(\\d+)`, this.statut.getStatutById);
    this.router.get(`${this.path}/page/:page(\\d+)`, this.statut.getPagination);
    this.router.get(`${this.path}/search`, this.statut.search);

    this.router.post(`${this.path}`, ValidationMiddleware(CreateStatutDto), this.statut.createStatut);
    this.router.post(`${this.path}/generate`, this.statut.generateStatut);

    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateStatutDto, true), this.statut.updateStatut);

    this.router.delete(`${this.path}/:id(\\d+)`, this.statut.deleteStatut);
  }
}
