import React from 'react';
import Task from '../Components/Task';

const DeletedTasks = ({ deletedTasks }) => {
  return (
    <>
      {deletedTasks.map(task => (
        <Task {...task} key={task.id} />
      ))}
    </>
  );
};

export default DeletedTasks;
