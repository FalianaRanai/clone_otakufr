import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  public nom_type: string;
}

export class UpdateTypeDto {
  @IsString()
  @IsNotEmpty()
  public nom_type: string;
}
