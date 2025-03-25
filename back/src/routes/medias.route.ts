import { MediaController } from '@controllers/medias.controller';
import { CreateMediaDto, UpdateMediaDto } from '@dtos/medias.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class MediaRoute implements Routes {
  public path = '/medias';
  public router = Router();
  public media = new MediaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.media.getMedias);
    this.router.get(`${this.path}/:id(\\d+)`, this.media.getMediaById);
    this.router.get(`${this.path}/getDetailedMediaId/:id(\\d+)`, this.media.getMediaByIdJoin);

    this.router.post(`${this.path}`, ValidationMiddleware(CreateMediaDto), this.media.createMedia);
    // this.router.post(`${this.path}/generate`, this.media.generateMedia);

    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateMediaDto, true), this.media.updateMedia);

    this.router.delete(`${this.path}/:id(\\d+)`, this.media.deleteMedia);
  }
}
