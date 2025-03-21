import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatutDto {
  @IsString()
  @IsNotEmpty()
  public nom_statut: string;
}

export class UpdateStatutDto {
  @IsString()
  @IsNotEmpty()
  public nom_statut: string;
}
