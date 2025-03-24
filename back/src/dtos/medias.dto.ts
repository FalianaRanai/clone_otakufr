import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  public titre: string;

  @IsString()
  public sygnopsis: string;

  @IsString()
  public autre_nom: string;

  @IsNumber()
  @IsNotEmpty()
  public id_auteur: number;

  @IsNumber()
  @IsNotEmpty()
  public id_realisateur: number;

  @IsNumber()
  @IsNotEmpty()
  public id_studio: number;

  @IsDate()
  public date_sortie: Date;

  @IsString()
  public duree: string;

  @IsNumber()
  @IsNotEmpty()
  public id_type: number;

  @IsNumber()
  @IsNotEmpty()
  public id_statut: number;

  @IsString()
  public affiche: string;
}

export class UpdateMediaDto {
  @IsString()
  public titre: string;

  @IsString()
  public sygnopsis: string;

  @IsString()
  public autre_nom: string;

  @IsNumber()
  @IsNotEmpty()
  public id_auteur: number;

  @IsNumber()
  @IsNotEmpty()
  public id_realisateur: number;

  @IsNumber()
  @IsNotEmpty()
  public id_studio: number;

  @IsDate()
  public date_sortie: Date;

  @IsString()
  public duree: string;

  @IsNumber()
  @IsNotEmpty()
  public id_type: number;

  @IsNumber()
  @IsNotEmpty()
  public id_statut: number;

  @IsString()
  public affiche: string;
}
