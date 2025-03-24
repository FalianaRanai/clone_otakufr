import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMediaGenreDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_media: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_genre: number;
}

export class UpdateMediaGenreDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_media: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_genre: number;
}
