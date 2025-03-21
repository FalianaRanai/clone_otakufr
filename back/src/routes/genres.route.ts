import { GenreController } from '@controllers/genres.controller';
import { CreateGenreDto } from '@dtos/genres.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class GenreRoute implements Routes {
  public path = '/genres';
  public router = Router();
  public genre = new GenreController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.genre.getGenres);
    this.router.get(`${this.path}/:id(\\d+)`, this.genre.getGenreById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateGenreDto), this.genre.createGenre);
    this.router.post(`${this.path}/generate`, this.genre.generateGenre);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateGenreDto, true), this.genre.updateGenre);
    this.router.delete(`${this.path}/:id(\\d+)`, this.genre.deleteGenre);
  }
}
