import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(3, 50)
  username: string;

  @IsOptional()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
