import { getRepository, Repository } from 'typeorm';
import { addDays } from 'date-fns';
import { TaskRepository } from '@/repositories/protocols/task-repository';
import { CreateTask } from '@/usecases/protocols';
import { StatusRole, TaskModel } from '@/models/task';
import Task from './entities/task';

class DbTaskRepository implements TaskRepository {
  public async list(): Promise<TaskModel[]> {
    const ormRepository = getRepository(Task);
    const lists = await ormRepository.find();

    return lists;
  }

  public async create(data: CreateTask.Params): Promise<TaskModel> {
    const ormRepository = getRepository(Task);
    const findById = ormRepository.create(data);

    return findById;
  }

  public async findById(id: number): Promise<TaskModel | undefined> {
    const ormRepository = getRepository(Task);
    const findById = await ormRepository.findOne(id);

    return findById;
  }

  public async save(data: TaskModel): Promise<TaskModel> {
    const ormRepository = getRepository(Task);
    await ormRepository.save(data);

    return data;
  }

  public async delete(id: number): Promise<boolean> {
    const ormRepository = getRepository(Task);
    const deleted = await ormRepository.delete(id);

    return Boolean(deleted);
  }

  public async sumNewForecast(id: number): Promise<Date | boolean> {
    const ormRepository = getRepository(Task);
    const [duration] = await ormRepository
      .createQueryBuilder('tasks')
      .select('SUM(tasks.duration)', 'sum')
      .where('tasks.task_list_id = :task_list_id', { task_list_id: id })
      .where('tasks.status = :status', { status: 'in_progress' })
      .orWhere('tasks.status = :status', { status: 'not_started' })
      .getRawOne();

    const dateStarted = await ormRepository.findOne({
      where: {
        task_list_id: id,
        status: 'in_progress',
      },
      select: ['started_at'],
    });

    if (dateStarted?.started_at) {
      return addDays(dateStarted.started_at, duration);
    }

    return false;
  }

  public async updateNextDependency(
    currentDependency: number | null | undefined,
    currentId: number,
  ): Promise<boolean> {
    const ormRepository = getRepository(Task);
    await ormRepository.save({
      id: currentId,
      dependency_id: null,
    });

    await ormRepository.save({
      dependency_id: currentId,
      status: StatusRole.in_progress,
      started_at: new Date(),
    });

    return true;
  }

  public async findByDependencyId(
    dependencyId: number,
  ): Promise<Task | undefined> {
    const ormRepository = getRepository(Task);
    const findTask = await ormRepository.findOne({
      where: {
        dependency_id: dependencyId,
      },
    });

    return findTask;
  }
}

export default DbTaskRepository;
