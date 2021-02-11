import { Request, Response } from 'express';
import DbTaskListRepository from '@/repositories/db-task-list/db-task-list-repository';
import {
  ServiceListTaskList,
  ServiceCreateTaskList,
  ServiceUpdateTaskList,
  ServiceDeleteTaskList,
} from '@/usecases/implementations/task-list';

class TaskListController {
  public async index(req: Request, res: Response) {
    try {
      const dbTaskListRepository = new DbTaskListRepository();
      const serviceListTaskList = new ServiceListTaskList(dbTaskListRepository);

      const lists = await serviceListTaskList.list();

      res.json(lists);
    } catch (err) {
      console.log(err);
    }
  }

  public async store(req: Request, res: Response) {
    try {
      const dbTaskListRepository = new DbTaskListRepository();
      const serviceCreateTaskList = new ServiceCreateTaskList(
        dbTaskListRepository,
      );
      const { name, due_date } = req.body;

      const newTaskList = await serviceCreateTaskList.create({
        name,
        due_date,
      });
      res.json(newTaskList);
    } catch (err) {
      res.status(500);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const dbTaskListRepository = new DbTaskListRepository();
      const serviceCreateTaskList = new ServiceUpdateTaskList(
        dbTaskListRepository,
      );
      const id = Number(req.params.taskListId);
      const { name, due_date } = req.body;

      const newTaskList = await serviceCreateTaskList.update({
        id,
        name,
        due_date,
      });
      res.json(newTaskList);
    } catch (err) {
      res.status(500);
    }
  }

  public async remove(req: Request, res: Response) {
    try {
      const dbTaskListRepository = new DbTaskListRepository();
      const serviceCreateTaskList = new ServiceDeleteTaskList(
        dbTaskListRepository,
      );
      const id = Number(req.params.taskListId);

      const newTaskList = await serviceCreateTaskList.delete(id);
      res.json(newTaskList);
    } catch (err) {
      res.status(500);
    }
  }
}

export default TaskListController;
