import { MediaService } from '@/services/medias.service';
import { Media } from '@interfaces/medias.interface';
import { NextFunction, Request, Response } from 'express';
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
}
