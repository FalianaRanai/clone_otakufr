import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  public titre: string;

  @IsString()
  public sygnopsis: string;

  @IsString()
  public autre_nom: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_auteur: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_realisateur: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_studio: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  public date_sortie: Date;

  @IsString()
  public duree: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_type: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_statut: number;

  // Optionnel si besoin, mais typé comme `any`
  public affiche?: any;
}

export class UpdateMediaDto {
  @IsString()
  public titre: string;

  @IsString()
  public sygnopsis: string;

  @IsString()
  public autre_nom: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_auteur: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_realisateur: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_studio: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  public date_sortie: Date;

  @IsString()
  public duree: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_type: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_statut: number;

  @IsString()
  public affiche: string;
}
