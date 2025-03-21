import { UserRole } from '@interfaces/user_roles.interface';
import { UserRoleService } from '@services/user_roles.service';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class UserRoleController {
  public user_role = Container.get(UserRoleService);

  public getUserRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUserRolesData: UserRole[] = await this.user_role.findAllUserRole();

      res.status(200).json({ data: findAllUserRolesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_roleId = Number(req.params.id);
      const findOneUserRoleData: UserRole = await this.user_role.findUserRoleById(user_roleId);

      res.status(200).json({ data: findOneUserRoleData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUserRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_roleData: UserRole = req.body;
      const createUserRoleData: UserRole = await this.user_role.createUserRole(user_roleData);

      res.status(201).json({ data: createUserRoleData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUserRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_roleId = Number(req.params.id);
      const user_roleData: UserRole = req.body;
      const updateUserRoleData: UserRole[] = await this.user_role.updateUserRole(user_roleId, user_roleData);

      res.status(200).json({ data: updateUserRoleData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUserRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user_roleId = Number(req.params.id);
      const deleteUserRoleData: UserRole[] = await this.user_role.deleteUserRole(user_roleId);

      res.status(200).json({ data: deleteUserRoleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public generateUserRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roles: UserRole[] = await this.user_role.generateUserRole();
      res.status(201).json({ data: roles, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getListeUserRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUserRolesData: UserRole[] = await this.user_role.getListeUserRole();

      res.status(200).json({ data: findAllUserRolesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}
