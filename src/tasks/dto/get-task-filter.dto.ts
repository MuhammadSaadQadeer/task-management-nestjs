import { TaskStatus } from '../tasks.status.enuml';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: string;
  @IsOptional()
  @IsString()
  search?: string;
}
