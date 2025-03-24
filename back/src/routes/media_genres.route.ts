import { MediaGenreController } from '@controllers/media_genres.controller';
// import { CreateMediaGenreDto } from '@dtos/media_genres.dto';
import { Routes } from '@interfaces/routes.interface';
// import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class MediaGenreRoute implements Routes {
  public path = '/media_genres';
  public router = Router();
  public media_genre = new MediaGenreController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.media_genre.getMediaGenres);
    // this.router.get(`${this.path}/:id(\\d+)`, this.media_genre.getMediaGenreById);
    // this.router.post(`${this.path}`, ValidationMiddleware(CreateMediaGenreDto), this.media_genre.createMediaGenre);
    // this.router.post(`${this.path}/generate`, this.media_genre.generateMediaGenre);
    // this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateMediaGenreDto, true), this.media_genre.updateMediaGenre);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.media_genre.deleteMediaGenre);
  }
}
