export const getTasks = () => {
  const tasks = localStorage.getItem('tasks');
  return JSON.parse(tasks) || [];
};

export const getLabels = () => {
  const tasks = getTasks();
  const labels = [];
  tasks.forEach(task => {
    if (!labels.includes(task.label)) {
      labels.push(task.label);
    }
  });
  return labels;
};

export const updateTasks = tasks => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const clearTasks = () => localStorage.removeItem('tasks');
