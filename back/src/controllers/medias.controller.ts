import { HttpException } from '@/exceptions/httpException';
import { MediaService } from '@/services/medias.service';
import { Media } from '@interfaces/medias.interface';
import { NextFunction, Request, Response } from 'express';
import { File } from 'multer';
import { Container } from 'typedi';

export class MediaController {
  public media = Container.get(MediaService);

  public getMedias = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllMediasData: Media[] = await this.media.findAllMedia();

      res.status(200).json({ data: findAllMediasData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getMediaById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mediaId = Number(req.params.id);
      const findOneMediaData: Media = await this.media.findMediaById(mediaId);

      res.status(200).json({ data: findOneMediaData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mediaData: Media = req.body;
      const file = (req as Request & { file: File }).file;

      if (!file) {
        throw new HttpException(400, 'File is required');
      }

      mediaData.affiche = file;
      console.log(mediaData);

      const createMediaData: Media = await this.media.createMedia(mediaData);

      res.status(201).json({ data: createMediaData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mediaId = Number(req.params.id);
      const mediaData: Media = req.body;
      const updateMediaData: Media[] = await this.media.updateMedia(mediaId, mediaData);

      res.status(200).json({ data: updateMediaData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteMedia = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mediaId = Number(req.params.id);
      const deleteMediaData: Media[] = await this.media.deleteMedia(mediaId);

      res.status(200).json({ data: deleteMediaData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public getMediaByIdJoin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const mediaId = Number(req.params.id);
      const findOneMediaData: Media = await this.media.findMediaByIdJoin(mediaId);

      res.status(200).json({ data: findOneMediaData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public generateMediaJSON = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.media.generateDataset();
      res.status(200).json({
        success: true,
        data: data,
        message: 'Dataset generated successfully',
      });
    } catch (error) {
      console.error('Error generating dataset:', error);
      next(error);
    }
  };

  public getPagination = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.params.page);
      const sample = parseInt(req.query.sample as string, 10) || 10; // Valeur par défaut : 10
      const findOneRealisateurData: Media[] = await this.media.getPagination(page, sample);
      const total_page = await this.media.getCountPagination(sample);

      res.status(200).json({ data: findOneRealisateurData, total_page: total_page, message: 'findAll pagination' });
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

      const findOneRealisateurData: Media[] = await this.media.search(search, page, sample);
      const total_page = await this.media.getCountPaginationSearch(search, sample);

      res.status(200).json({ data: findOneRealisateurData, total_page: total_page, message: 'search' });
    } catch (error) {
      next(error);
    }
  };
}
