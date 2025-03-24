import { AuteurController } from '@controllers/auteurs.controller';
import { CreateAuteurDto } from '@dtos/auteurs.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class AuteurRoute implements Routes {
  public path = '/auteurs';
  public router = Router();
  public auteur = new AuteurController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.auteur.getAuteurs);
    this.router.get(`${this.path}/:id(\\d+)`, this.auteur.getAuteurById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateAuteurDto), this.auteur.createAuteur);
    // this.router.post(`${this.path}/generate`, this.auteur.generateAuteur);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateAuteurDto, true), this.auteur.updateAuteur);
    this.router.delete(`${this.path}/:id(\\d+)`, this.auteur.deleteAuteur);
  }
}
