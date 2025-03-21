import { TypeController } from '@controllers/types.controller';
import { CreateTypeDto } from '@dtos/types.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class TypeRoute implements Routes {
  public path = '/types';
  public router = Router();
  public type = new TypeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.type.getTypes);
    this.router.get(`${this.path}/:id(\\d+)`, this.type.getTypeById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateTypeDto), this.type.createType);
    this.router.post(`${this.path}/generate`, this.type.generateType);
    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(CreateTypeDto, true), this.type.updateType);
    this.router.delete(`${this.path}/:id(\\d+)`, this.type.deleteType);
  }
}
