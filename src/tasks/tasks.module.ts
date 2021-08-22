import { AuthModule } from './../auth/auth.module';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
  providers: [TasksService],
  controllers: [TaskController],
})
export class TasksModule {}
