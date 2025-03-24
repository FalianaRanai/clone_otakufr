import { StudioController } from '@controllers/studios.controller';
import { CreateStudioDto, UpdateStudioDto } from '@dtos/studios.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class StudioRoute implements Routes {
  public path = '/studios';
  public router = Router();
  public studio = new StudioController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.studio.getStudios);
    this.router.get(`${this.path}/:id(\\d+)`, this.studio.getStudioById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateStudioDto), this.studio.createStudio);
    // this.router.post(`${this.path}/generate`, this.studio.generateStudio);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateStudioDto, true), this.studio.updateStudio);
    this.router.delete(`${this.path}/:id(\\d+)`, this.studio.deleteStudio);
  }
}
