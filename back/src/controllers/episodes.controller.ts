import { EpisodeService } from '@/services/episodes.service';
import { Episode } from '@interfaces/episodes.interface';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class EpisodeController {
  public episode = Container.get(EpisodeService);

  public getEpisodes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllEpisodesData: Episode[] = await this.episode.findAllEpisode();

      res.status(200).json({ data: findAllEpisodesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getEpisodeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const episodeId = Number(req.params.id);
      const findOneEpisodeData: Episode = await this.episode.findEpisodeById(episodeId);

      res.status(200).json({ data: findOneEpisodeData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createEpisode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const episodeData: Episode = req.body;
      const createEpisodeData: Episode = await this.episode.createEpisode(episodeData);

      res.status(201).json({ data: createEpisodeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateEpisode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const episodeId = Number(req.params.id);
      const episodeData: Episode = req.body;
      const updateEpisodeData: Episode[] = await this.episode.updateEpisode(episodeId, episodeData);

      res.status(200).json({ data: updateEpisodeData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteEpisode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const episodeId = Number(req.params.id);
      const deleteEpisodeData: Episode[] = await this.episode.deleteEpisode(episodeId);

      res.status(200).json({ data: deleteEpisodeData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getHomePagination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.params.page);
      const findOneEpisodeData: Episode[] = await this.episode.getHomePagination(page);
      const total_page = await this.episode.getCountPagination();

      res.status(200).json({ data: findOneEpisodeData, total_page: total_page, message: 'findAll pagination' });
    } catch (error) {
      next(error);
    }
  };

  public getPagination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.params.page);
      const sample = parseInt(req.query.sample as string, 10) || 10; // Valeur par défaut : 10
      const findOneEpisodeData: Episode[] = await this.episode.getPagination(page, sample);
      const total_page = await this.episode.getCountPagination(sample);

      res.status(200).json({ data: findOneEpisodeData, total_page: total_page, message: 'findAll pagination' });
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

      const findOneEpisodeData: Episode[] = await this.episode.search(search, page, sample);
      const total_page = await this.episode.getCountPaginationSearch(search, sample);

      res.status(200).json({ data: findOneEpisodeData, total_page: total_page, message: 'search' });
    } catch (error) {
      next(error);
    }
  };
}
