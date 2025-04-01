import { TypeService } from '@/services/types.service';
import { Type } from '@interfaces/types.interface';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class TypeController {
  public type = Container.get(TypeService);

  public getTypes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllTypesData: Type[] = await this.type.findAllType();

      res.status(200).json({ data: findAllTypesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTypeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeId = Number(req.params.id);
      const findOneTypeData: Type = await this.type.findTypeById(typeId);

      res.status(200).json({ data: findOneTypeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeData: Type = req.body;
      const createTypeData: Type = await this.type.createType(typeData);

      res.status(201).json({ data: createTypeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeId = Number(req.params.id);
      const typeData: Type = req.body;
      const updateTypeData: Type[] = await this.type.updateType(typeId, typeData);

      res.status(200).json({ data: updateTypeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeId = Number(req.params.id);
      const deleteTypeData: Type[] = await this.type.deleteType(typeId);

      res.status(200).json({ data: deleteTypeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public generateType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const types: Type[] = await this.type.generateType();
      res.status(201).json({ data: types, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getPagination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.params.page);
      const sample = parseInt(req.query.sample as string, 10) || 10; // Valeur par défaut : 10
      const findOneTypeData: Type[] = await this.type.getPagination(page, sample);
      const total_page = await this.type.getCountPagination(sample);

      res.status(200).json({ data: findOneTypeData, total_page: total_page, message: 'findAll pagination' });
    } catch (error) {
      next(error);
    }
  };

  public search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req.query);
      const search = req.query.search ? req.query.search.toString() : '';
      const sample = parseInt(req.query.sample as string, 10) || 10; // Valeur par défaut : 10
      const page = parseInt(req.query.page as string, 10) || 1;

      const findOneTypeData: Type[] = await this.type.search(search, page, sample);
      const total_page = await this.type.getCountPaginationSearch(search, sample);

      res.status(200).json({ data: findOneTypeData, total_page: total_page, message: 'search' });
    } catch (error) {
      next(error);
    }
  };
}
