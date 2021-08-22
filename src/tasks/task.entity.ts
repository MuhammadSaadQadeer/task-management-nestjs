import { TaskStatus } from './tasks.status.enuml';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tite: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
