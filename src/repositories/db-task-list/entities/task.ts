import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { TaskModel, StatusRole } from '@/models/task';

@Entity('tasks')
class Task implements TaskModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: StatusRole,
    default: StatusRole.not_started,
  })
  status: StatusRole;

  @Column()
  duration: number;

  @Column()
  started_at?: Date;

  @Column()
  due_date?: Date;

  @Column()
  dependency_id?: number | null | undefined;

  @Column()
  task_list_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Task;
