import { AuteurService } from '@/services/auteurs.service';
import { Auteur } from '@interfaces/auteurs.interface';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class AuteurController {
  public auteur = Container.get(AuteurService);

  public getAuteurs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllAuteursData: Auteur[] = await this.auteur.findAllAuteur();

      res.status(200).json({ data: findAllAuteursData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getAuteurById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const auteurId = Number(req.params.id);
      const findOneAuteurData: Auteur = await this.auteur.findAuteurById(auteurId);

      res.status(200).json({ data: findOneAuteurData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createAuteur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const auteurData: Auteur = req.body;
      const createAuteurData: Auteur = await this.auteur.createAuteur(auteurData);

      res.status(201).json({ data: createAuteurData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAuteur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const auteurId = Number(req.params.id);
      const auteurData: Auteur = req.body;
      const updateAuteurData: Auteur[] = await this.auteur.updateAuteur(auteurId, auteurData);

      res.status(200).json({ data: updateAuteurData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAuteur = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const auteurId = Number(req.params.id);
      const deleteAuteurData: Auteur[] = await this.auteur.deleteAuteur(auteurId);

      res.status(200).json({ data: deleteAuteurData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
