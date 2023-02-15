import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsOptional()
  is_today: boolean;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  tag: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  description: string;
}

export class CreateTaskDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  title: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  tag: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  description: string;
}

export class UpdateTaskDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  title: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  tag: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  completed: boolean;
}

export class UpdateOrderTaskDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  sourceId: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  destinationId: string;

  sourceIndex: number;

  destinationIndex: number;
}
