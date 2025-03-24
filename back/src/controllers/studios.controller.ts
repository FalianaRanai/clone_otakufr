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
}
