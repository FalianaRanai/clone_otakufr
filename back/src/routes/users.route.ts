import { UserController } from '@controllers/users.controller';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, this.user.getUserById);

    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.post(`${this.path}/generate`, this.user.generateUser);

    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateUserDto, true), this.user.updateUser);

    this.router.delete(`${this.path}/:id(\\d+)`, this.user.deleteUser);
  }
}
