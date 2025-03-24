import { SaisonService } from '@/services/saisons.service';
import { Saison } from '@interfaces/saisons.interface';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class SaisonController {
  public saison = Container.get(SaisonService);

  public getSaisons = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllSaisonsData: Saison[] = await this.saison.findAllSaison();

      res.status(200).json({ data: findAllSaisonsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSaisonById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const saisonId = Number(req.params.id);
      const findOneSaisonData: Saison = await this.saison.findSaisonById(saisonId);

      res.status(200).json({ data: findOneSaisonData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSaison = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const saisonData: Saison = req.body;
      const createSaisonData: Saison = await this.saison.createSaison(saisonData);

      res.status(201).json({ data: createSaisonData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSaison = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const saisonId = Number(req.params.id);
      const saisonData: Saison = req.body;
      const updateSaisonData: Saison[] = await this.saison.updateSaison(saisonId, saisonData);

      res.status(200).json({ data: updateSaisonData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSaison = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const saisonId = Number(req.params.id);
      const deleteSaisonData: Saison[] = await this.saison.deleteSaison(saisonId);

      res.status(200).json({ data: deleteSaisonData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
