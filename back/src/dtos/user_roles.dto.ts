import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserRoleDto {
  @IsNumber()
  @IsNotEmpty()
  public id_user: number;

  @IsNumber()
  @IsNotEmpty()
  public id_role: number;
}

export class UpdateUserRoleDto {
  @IsNumber()
  @IsNotEmpty()
  public id_user: number;

  @IsNumber()
  @IsNotEmpty()
  public id_role: number;
}
