import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { TaskListModel } from '@/models/task-list';

@Entity('task-lists')
class TaskList implements TaskListModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  started_at: Date | null;

  @Column()
  due_date: Date;

  @Column()
  forecasted_completion_date: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default TaskList;
