import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './tasks.status.enuml';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Param } from '@nestjs/common';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterTask: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterTask);
  }

  @Post()
  createTask(@Body() createTask: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTask);
  }

  // @Get('/:id')
  // findTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.findTaskById(id);
  // }

  @Get('/:id')
  findTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findTaskById(id);
  }
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatus: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatus;
    return this.tasksService.updateTaskStatus(id, status);
  }
}
