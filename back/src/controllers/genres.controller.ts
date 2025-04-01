import { GenreService } from '@/services/genres.service';
import { Genre } from '@interfaces/genres.interface';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class GenreController {
  public genre = Container.get(GenreService);

  public getGenres = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllGenresData: Genre[] = await this.genre.findAllGenre();

      res.status(200).json({ data: findAllGenresData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getGenreById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const genreId = Number(req.params.id);
      const findOneGenreData: Genre = await this.genre.findGenreById(genreId);

      res.status(200).json({ data: findOneGenreData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createGenre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const genreData: Genre = req.body;
      const createGenreData: Genre = await this.genre.createGenre(genreData);

      res.status(201).json({ data: createGenreData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateGenre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const genreId = Number(req.params.id);
      const genreData: Genre = req.body;
      const updateGenreData: Genre[] = await this.genre.updateGenre(genreId, genreData);

      res.status(200).json({ data: updateGenreData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteGenre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const genreId = Number(req.params.id);
      const deleteGenreData: Genre[] = await this.genre.deleteGenre(genreId);

      res.status(200).json({ data: deleteGenreData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public generateGenre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const genres: Genre[] = await this.genre.generateGenre();
      res.status(201).json({ data: genres, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getPagination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.params.page);
      const sample = parseInt(req.query.sample as string, 10) || 10; // Valeur par défaut : 10
      const findOneGenreData: Genre[] = await this.genre.getPagination(page, sample);
      const total_page = await this.genre.getCountPagination(sample);

      res.status(200).json({ data: findOneGenreData, total_page: total_page, message: 'findAll pagination' });
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

      const findOneGenreData: Genre[] = await this.genre.search(search, page, sample);
      const total_page = await this.genre.getCountPaginationSearch(search, sample);

      res.status(200).json({ data: findOneGenreData, total_page: total_page, message: 'search' });
    } catch (error) {
      next(error);
    }
  };
}
