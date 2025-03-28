import { RealisateurService } from '@/services/realisateurs.service';
import { Realisateur } from '@interfaces/realisateurs.interface';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class RealisateurController {
  public realisateur = Container.get(RealisateurService);

  public getRealisateurs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllRealisateursData: Realisateur[] = await this.realisateur.findAllRealisateur();

      res.status(200).json({ data: findAllRealisateursData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getRealisateurById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const realisateurId = Number(req.params.id);
      const findOneRealisateurData: Realisateur = await this.realisateur.findRealisateurById(realisateurId);

      res.status(200).json({ data: findOneRealisateurData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createRealisateur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const realisateurData: Realisateur = req.body;
      const createRealisateurData: Realisateur = await this.realisateur.createRealisateur(realisateurData);

      res.status(201).json({ data: createRealisateurData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateRealisateur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const realisateurId = Number(req.params.id);
      const realisateurData: Realisateur = req.body;
      const updateRealisateurData: Realisateur[] = await this.realisateur.updateRealisateur(realisateurId, realisateurData);

      res.status(200).json({ data: updateRealisateurData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteRealisateur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const realisateurId = Number(req.params.id);
      const deleteRealisateurData: Realisateur[] = await this.realisateur.deleteRealisateur(realisateurId);

      res.status(200).json({ data: deleteRealisateurData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getHomePagination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.params.page);
      const findOneRealisateurData: Realisateur[] = await this.realisateur.getHomePagination(page);
      const total_page = await this.realisateur.getCountPagination();

      res.status(200).json({ data: findOneRealisateurData, total_page: total_page, message: 'findAll pagination' });
    } catch (error) {
      next(error);
    }
  };
}
