import { StatutService } from '@/services/statuts.service';
import { Statut } from '@interfaces/statuts.interface';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class StatutController {
  public statut = Container.get(StatutService);

  public getStatuts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllStatutsData: Statut[] = await this.statut.findAllStatut();

      res.status(200).json({ data: findAllStatutsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getStatutById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const statutId = Number(req.params.id);
      const findOneStatutData: Statut = await this.statut.findStatutById(statutId);

      res.status(200).json({ data: findOneStatutData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createStatut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const statutData: Statut = req.body;
      const createStatutData: Statut = await this.statut.createStatut(statutData);

      res.status(201).json({ data: createStatutData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateStatut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const statutId = Number(req.params.id);
      const statutData: Statut = req.body;
      const updateStatutData: Statut[] = await this.statut.updateStatut(statutId, statutData);

      res.status(200).json({ data: updateStatutData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteStatut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const statutId = Number(req.params.id);
      const deleteStatutData: Statut[] = await this.statut.deleteStatut(statutId);

      res.status(200).json({ data: deleteStatutData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public generateStatut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const statuts: Statut[] = await this.statut.generateStatut();
      res.status(201).json({ data: statuts, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getPagination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.params.page);
      const sample = parseInt(req.query.sample as string, 10) || 10; // Valeur par défaut : 10
      const findOneStatutData: Statut[] = await this.statut.getPagination(page, sample);
      const total_page = await this.statut.getCountPagination(sample);

      res.status(200).json({ data: findOneStatutData, total_page: total_page, message: 'findAll pagination' });
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

      const findOneStatutData: Statut[] = await this.statut.search(search, page, sample);
      const total_page = await this.statut.getCountPaginationSearch(search, sample);

      res.status(200).json({ data: findOneStatutData, total_page: total_page, message: 'search' });
    } catch (error) {
      next(error);
    }
  };
}
