import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  public nom_role: string;
}

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  public nom_role: string;
}
