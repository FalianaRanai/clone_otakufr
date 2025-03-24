import { MediaGenreService } from '@/services/media_genres.service';
import { MediaGenre } from '@interfaces/media_genres.interface';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';

export class MediaGenreController {
  public media_genre = Container.get(MediaGenreService);

  public getMediaGenres = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMediaGenresData: MediaGenre[] = await this.media_genre.findAllMediaGenre();

      res.status(200).json({ data: findAllMediaGenresData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMediaGenreById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const media_genreId = Number(req.params.id);
      const findOneMediaGenreData: MediaGenre = await this.media_genre.findMediaGenreById(media_genreId);

      res.status(200).json({ data: findOneMediaGenreData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createMediaGenre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const media_genreData: MediaGenre = req.body;
      const createMediaGenreData: MediaGenre = await this.media_genre.createMediaGenre(media_genreData);

      res.status(201).json({ data: createMediaGenreData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMediaGenre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const media_genreId = Number(req.params.id);
      const media_genreData: MediaGenre = req.body;
      const updateMediaGenreData: MediaGenre[] = await this.media_genre.updateMediaGenre(media_genreId, media_genreData);

      res.status(200).json({ data: updateMediaGenreData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMediaGenre = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const media_genreId = Number(req.params.id);
      const deleteMediaGenreData: MediaGenre[] = await this.media_genre.deleteMediaGenre(media_genreId);

      res.status(200).json({ data: deleteMediaGenreData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public generate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const genres: MediaGenre[] = await this.media_genre.generate();
      res.status(201).json({ data: genres, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
