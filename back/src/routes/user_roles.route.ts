import { CreateUserRoleDto, UpdateUserRoleDto } from '@/dtos/user_roles.dto';
import { UserRoleController } from '@controllers/user_roles.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class UserRoleRoute implements Routes {
  public path = '/user_roles';
  public router = Router();
  public user_role = new UserRoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user_role.getUserRoles);
    this.router.get(`${this.path}/:id(\\d+)`, this.user_role.getUserRoleById);
    this.router.get(`${this.path}/getListeUserRole`, this.user_role.getListeUserRole);

    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserRoleDto), this.user_role.createUserRole);
    this.router.post(`${this.path}/generate`, this.user_role.generateUserRole);

    this.router.put(`${this.path}/:id(\\d+)`, ValidationMiddleware(UpdateUserRoleDto, true), this.user_role.updateUserRole);

    this.router.delete(`${this.path}/:id(\\d+)`, this.user_role.deleteUserRole);
  }
}
