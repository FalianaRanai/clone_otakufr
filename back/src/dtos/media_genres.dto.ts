import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaGenreDto {
  @IsString()
  @IsNotEmpty()
  public id_media: number;
  public id_genre: number;
}

export class UpdateMediaGenreDto {
  @IsString()
  @IsNotEmpty()
  public id_media: number;
  public id_genre: number;
}
