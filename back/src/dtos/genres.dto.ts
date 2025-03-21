import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  public nom_genre: string;
}

export class UpdateGenreDto {
  @IsString()
  @IsNotEmpty()
  public nom_genre: string;
}
