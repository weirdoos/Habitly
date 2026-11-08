import { IsOptional } from 'class-validator';

export class UpdateHabitDto {
  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  category: string;

  @IsOptional()
  percentage: number;

  @IsOptional()
  isCompleted: boolean;
}
