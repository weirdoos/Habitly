import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Username must be a string' })
  username: string;

  @IsString({ message: 'Email must be a string' })
  @Length(5, 50, { message: 'Email must be between 5 and 50 characters' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(6, 100, { message: 'Password must be between 6 and 100 characters' })
  password: string;
}
