const tasks = [];

function addTask(call, callback) {
  const taskAlreadyExists = tasks.find(task => task.name === call.request.name)
  if (taskAlreadyExists) {
    return callback(new Error("Task already exists"), null);
  }

  const task = {
    id: tasks.length,
    name: call.request.name,
    responsible: call.request.responsible,
    done: false
  }

  tasks.push(task);
  callback(null, task);
}

function completeTask(call, callback) {
  const findTaskIndex = tasks.findIndex(task => task.id === Number(call.request.id));

  if (findTaskIndex < 0) {
    return callback(new Error("Task not found"), null)
  }

  tasks[findTaskIndex].done = true;

  callback(null, tasks[findTaskIndex]);
}

function listTasks(call, callback) {
  if (!tasks.length) {
    return callback(new Error("No tasks to list"), null)
  }

  callback(null, { tasks });
}

export { addTask, completeTask, listTasks };
