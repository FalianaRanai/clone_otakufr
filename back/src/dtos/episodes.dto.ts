import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  public nom_episode: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public numero: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_media: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  public date_sortie: Date;
}

export class UpdateEpisodeDto {
  @IsString()
  public nom_episode: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public numero: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_media: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  public date_sortie: Date;
}
