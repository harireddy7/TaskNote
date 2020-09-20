import React from 'react';
import Task from '../Components/Task';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px 15px',
    '@media (max-width: 350px)': {
      margin: '10px 10px'
    }
  }
}));

const ActiveTasks = ({ activeTasks = [], ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {activeTasks.map(task => (
        <Task {...task} key={task.id} {...rest} />
      ))}
    </div>
  );
};

export default ActiveTasks;
