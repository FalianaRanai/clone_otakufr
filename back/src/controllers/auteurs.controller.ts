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

  public getPagination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.params.page);
      const sample = parseInt(req.query.sample as string, 10) || 10; // Valeur par défaut : 10
      const findOneAuteurData: Auteur[] = await this.auteur.getPagination(page, sample);
      const total_page = await this.auteur.getCountPagination(sample);

      res.status(200).json({ data: findOneAuteurData, total_page: total_page, message: 'findAll pagination' });
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

      const findOneAuteurData: Auteur[] = await this.auteur.search(search, page, sample);
      const total_page = await this.auteur.getCountPaginationSearch(search, sample);

      res.status(200).json({ data: findOneAuteurData, total_page: total_page, message: 'search' });
    } catch (error) {
      next(error);
    }
  };
}
