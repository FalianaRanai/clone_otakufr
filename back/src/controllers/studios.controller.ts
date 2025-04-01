import { StudioService } from '@/services/studios.service';
import { Studio } from '@interfaces/studios.interface';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class StudioController {
  public studio = Container.get(StudioService);

  public getStudios = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllStudiosData: Studio[] = await this.studio.findAllStudio();

      res.status(200).json({ data: findAllStudiosData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getStudioById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studioId = Number(req.params.id);
      const findOneStudioData: Studio = await this.studio.findStudioById(studioId);

      res.status(200).json({ data: findOneStudioData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createStudio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studioData: Studio = req.body;
      const createStudioData: Studio = await this.studio.createStudio(studioData);

      res.status(201).json({ data: createStudioData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateStudio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studioId = Number(req.params.id);
      const studioData: Studio = req.body;
      const updateStudioData: Studio[] = await this.studio.updateStudio(studioId, studioData);

      res.status(200).json({ data: updateStudioData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStudio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studioId = Number(req.params.id);
      const deleteStudioData: Studio[] = await this.studio.deleteStudio(studioId);

      res.status(200).json({ data: deleteStudioData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getPagination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.params.page);
      const sample = parseInt(req.query.sample as string, 10) || 10; // Valeur par défaut : 10
      const findOneStudioData: Studio[] = await this.studio.getPagination(page, sample);
      const total_page = await this.studio.getCountPagination(sample);

      res.status(200).json({ data: findOneStudioData, total_page: total_page, message: 'findAll pagination' });
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

      const findOneStudioData: Studio[] = await this.studio.search(search, page, sample);
      const total_page = await this.studio.getCountPaginationSearch(search, sample);

      res.status(200).json({ data: findOneStudioData, total_page: total_page, message: 'search' });
    } catch (error) {
      next(error);
    }
  };
}
