import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  title: string;

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;
}
