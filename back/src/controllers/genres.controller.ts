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
}
