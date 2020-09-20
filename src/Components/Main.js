import React, { useState } from 'react';
import NewTask from '../Pages/NewTask';
import Navigator from './Navigator';
import { makeStyles } from '@material-ui/core';
import { getTasks, updateTasks } from '../useLocalStorage';
// import ConfirmDialog from './ConfirmDialog';

// const MESSAGES = {
//   deleteTask: 'Do you wish to delete this task',
//   completeTask: 'Are you sure to complete this task',
//   activeTask: 'Do you wish to make this task Active again'
// };

const useStyles = makeStyles(theme => ({
  mainContainer: {
    // marginTop: '60px'
  }
}));

const Main = () => {
  const classes = useStyles();

  const [tasks, setTasks] = useState(() => getTasks());
  const [tabValue, setTabValue] = useState(0);
  // const [dialogState, toggleDialog] = useState({
  //   open: false,
  //   message: ''
  // });

  const [editableTask, setEditableTask] = useState(null);

  const changeTab = (_, val) => setTabValue(val);

  const addTask = task => {
    const revisedTasks = [task, ...tasks];

    updateTasks(revisedTasks);
    setTasks(revisedTasks);

    if (tabValue === 1) {
      setTabValue(0);
    }
  };

  const editTask = id => {
    const targetTask = tasks.find(task => task.id === id);
    setEditableTask(targetTask);
  };

  const updateTask = editedTask => {
    const index = tasks.findIndex(task => task.id === editedTask.id);
    const revisedTasks = [...tasks];
    revisedTasks[index] = { ...editedTask };

    setTasks(revisedTasks);
    updateTasks(revisedTasks);

    if (tabValue === 1) {
      setTabValue(0);
    }

    setEditableTask(null);
  };

  const deleteTask = id => {
    // toggleDialog({ open: true, message: MESSAGES.deleteTask });

    const revisedTasks = tasks.filter(task => task.id !== id);
    updateTasks(revisedTasks);
    setTasks(revisedTasks);
  };

  const updateStatus = (id, status) => {
    const index = tasks.findIndex(task => task.id === id);
    const revisedTasks = [...tasks];
    revisedTasks[index] = {
      ...revisedTasks[index],
      status: !status,
      ...(status ? { completedOn: +new Date() } : { createdOn: +new Date(), completedOn: null })
    };
    setTasks(revisedTasks);
    updateTasks(revisedTasks);

    setTabValue(status ? 1 : 0);
  };

  return (
    <div className={classes.mainContainer}>
      <NewTask addTask={addTask} editableTask={editableTask} updateTask={updateTask} />
      <Navigator
        tasks={tasks}
        tabValue={tabValue}
        changeTab={changeTab}
        deleteTask={deleteTask}
        editTask={editTask}
        updateStatus={updateStatus}
      />
      {/* {dialogState.open && <ConfirmDialog {...dialogState} confirmYes={() => {}} confirmNo={() => {}} />} */}
    </div>
  );
};

export default Main;
