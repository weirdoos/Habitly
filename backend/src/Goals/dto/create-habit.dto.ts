import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateHabitDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;

  @IsNumber()
  @IsOptional()
  percentage: number;
}
