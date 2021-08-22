import { User } from 'src/auth/user.entity';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './tasks.status.enuml';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      tite: title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }

  async deleteTaskById(id: string, user): Promise<void> {
    const result = await this.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} does not exists`);
    }
  }

  async getTasks(filterTaskDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const { status, search } = filterTaskDto;

    if (user) {
      query.where({ user });
    }

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.tite) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = query.getMany();
    return tasks;
  }
}
