import { getRepository, Repository } from 'typeorm';
import { TaskListRepository } from '@/repositories/protocols/task-list-repository';
import { CreateTaskList } from '@/usecases/protocols';
import { TaskListModel } from '@/models/task-list';
import TaskList from './entities/task-list';

class DbTaskListListRepository implements TaskListRepository {
  public async list(): Promise<TaskListModel[]> {
    const ormRepository = getRepository(TaskList);
    const lists = await ormRepository.find();

    return lists;
  }

  public async create(data: CreateTaskList.Params): Promise<TaskListModel> {
    const ormRepository = getRepository(TaskList);
    const findById = ormRepository.create(data);

    return findById;
  }

  public async findById(id: number): Promise<TaskListModel | undefined> {
    const ormRepository = getRepository(TaskList);
    const findById = await ormRepository.findOne(id);

    return findById;
  }

  public async save(data: TaskListModel): Promise<TaskListModel> {
    const ormRepository = getRepository(TaskList);
    await ormRepository.save(data);

    return data;
  }

  public async delete(id: number): Promise<boolean> {
    const ormRepository = getRepository(TaskList);
    const deleted = await ormRepository.delete(id);

    return Boolean(deleted);
  }

  public async updateForecastDate(id: number, date: Date): Promise<boolean> {
    const ormRepository = getRepository(TaskList);
    const updated = ormRepository.save({
      id,
      forecasted_completion_date: date,
    });

    return Boolean(updated);
  }
}

export default DbTaskListListRepository;
