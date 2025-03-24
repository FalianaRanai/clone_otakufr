import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSaisonDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_media: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public numero: number;
}

export class UpdateSaisonDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_media: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public numero: number;
}
