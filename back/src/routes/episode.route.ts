import { EpisodeController } from '@controllers/episodes.controller';
import { CreateEpisodeDto, UpdateEpisodeDto } from '@dtos/episodes.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class EpisodeRoute implements Routes {
  public path = '/episodes';
  public router = Router();
  public episode = new EpisodeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.episode.getEpisodes);
    this.router.get(`${this.path}/:id(\\d+)`, this.episode.getEpisodeById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateEpisodeDto), this.episode.createEpisode);
    // this.router.post(`${this.path}/generate`, this.episode.generateEpisode);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateEpisodeDto, true), this.episode.updateEpisode);
    this.router.delete(`${this.path}/:id(\\d+)`, this.episode.deleteEpisode);
  }
}
