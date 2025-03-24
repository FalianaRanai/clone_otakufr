import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRealisateurDto {
  @IsString()
  @IsNotEmpty()
  public nom_realisateur: string;
}

export class UpdateRealisateurDto {
  @IsString()
  @IsNotEmpty()
  public nom_realisateur: string;
}
