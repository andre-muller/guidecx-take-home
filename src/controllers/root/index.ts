import { Response, Request } from 'express';

export function home(req: Request, res: Response) {
  res.send(`
    <style>
      body {
        width: 100%;
        max-height: 100vh;
        background: rgb(31, 41, 55);
        color: white;
        font-family: sans-serif;
      }
      
      main.content {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        max-width: 70%;
        justify-content: center;
        height: 100%;
      }

    </style>


    <main class="content">
      <h1>GuideCX: Node</h1>
    
      <h2>Congrats, you've got it working!</h2>

      <p>
        Acme Inc needs to know how long a set of tasks is going to take their team to complete, and have those
        forecasts to be updated as tasks are completed. If a task is completed early, then that will move up the
        forecasted end date. If a task is completed late, then the forecast is going to be late.
      </p>
      <p>
        The team can only work on one task at a time, and must complete that task before moving onto the next one. Each
        task has a duration in days, so you can estimate when it will be completed as soon as the status changes to "In Progess".
        Once a task is "Complete", then the next task in the list moves to "In Progress" and the forecasted completion date
        is updated accordingly.
      <p>

      <ul>
        <li>Build an idempotent Rest API</li>
        <li>CRUD Task & TaskList resources, including ability to add/remove tasks in a List</li>
        <li>Ability to change a task status</li>
        <li>Accurate forecasted end date of a task list that responds to tasks being completed early or late</li>
      </ul>
    </main>
  `);
}

export function health(req: Request, res: Response) {
  res.send('OK');
}
