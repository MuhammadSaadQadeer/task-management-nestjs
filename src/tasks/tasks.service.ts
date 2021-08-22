import { TaskRepository } from './task.repository';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.status.enuml';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

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
  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async findTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({ id, user });
    console.log({ found });
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }
    return found;
  }
  deleteTaskById(id: string, user: User): Promise<void> {
    return this.taskRepository.deleteTaskById(id, user);
  }
  async updateTaskStatus(
    id: string,
    taskStatus: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.findTaskById(id, user);
    task.status = taskStatus;
    return task;
  }
  getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }
}
