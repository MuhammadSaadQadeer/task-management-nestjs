import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.status.enuml';
export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
