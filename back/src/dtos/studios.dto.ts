import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudioDto {
  @IsString()
  @IsNotEmpty()
  public nom_studio: string;
}

export class UpdateStudioDto {
  @IsString()
  @IsNotEmpty()
  public nom_studio: string;
}
