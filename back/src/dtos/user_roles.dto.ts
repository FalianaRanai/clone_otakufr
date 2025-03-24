import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserRoleDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_user: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_role: number;
}

export class UpdateUserRoleDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_user: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  public id_role: number;
}
