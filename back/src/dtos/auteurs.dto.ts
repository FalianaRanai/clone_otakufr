import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuteurDto {
  @IsString()
  @IsNotEmpty()
  public nom_auteur: string;
}

export class UpdateAuteurDto {
  @IsString()
  @IsNotEmpty()
  public nom_auteur: string;
}
