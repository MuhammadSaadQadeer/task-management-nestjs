import { TaskRepository } from './task.repository';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.status.enuml';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async findTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    console.log({ found });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }
  deleteTaskById(id: string): Promise<void> {
    return this.taskRepository.deleteTaskById(id);
  }
  async updateTaskStatus(id: string, taskStatus: TaskStatus): Promise<Task> {
    const task = await this.findTaskById(id);
    task.status = taskStatus;
    return task;
  }
  getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }
}
