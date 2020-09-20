import React, { useReducer, useEffect } from 'react';
import { Grid, TextField, Button, Container, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { getLabels } from '../useLocalStorage';

const useStyles = makeStyles(theme => ({
  taskFormContainer: {
    padding: '2rem 1rem'
    // background: theme.palette.light.dark
  },
  taskGrid: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridGap: '1rem',
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: 'repeat(3, 32%)'
    },
    [theme.breakpoints.only('xs')]: {
      maxWidth: '380px',
      margin: '0 auto'
    }
  },
  gridItem: {
    width: '100%'
  },
  taskInput: {
    width: '100%'
  },
  addTaskBtn: {
    width: '100%',
    background: 'indigo',
    color: theme.palette.light.main,
    '&:hover': {
      background: theme.palette.primary.main,
      color: theme.palette.light.main
    }
  }
}));

const initState = {
  title: '',
  label: ''
};

const NewTask = ({ addTask, editableTask, updateTask }) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer((state, next) => ({ ...state, ...next }), initState);
  const TASK_LABELS = getLabels();

  const { title, label } = state;

  useEffect(() => {
    if (editableTask && editableTask.id && editableTask.status) {
      dispatch(editableTask);
    }
  }, [editableTask]);

  const handleTextChange = e => {
    const { name, value } = e.target;
    dispatch({ [name]: value });
  };

  const handleAddTask = e => {
    e.preventDefault();
    const newTask = {
      id: (+new Date()).toString(),
      title,
      label,
      createdOn: +new Date(),
      completedOn: null,
      deletedOn: null,
      status: true
    };
    // console.log(newTask);

    if (editableTask && editableTask.id) {
      updateTask({
        ...editableTask,
        title,
        label
      });
    } else {
      addTask(newTask);
    }

    dispatch(initState);
  };

  return (
    <Container maxWidth="md" className={classes.taskFormContainer} id="new-task-container">
      <form onSubmit={handleAddTask}>
        <Grid container className={classes.taskGrid}>
          <Grid item className={classes.gridItem}>
            <TextField
              id="task"
              name="title"
              variant="outlined"
              size="small"
              label="Task"
              className={classes.taskInput}
              value={title}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <Autocomplete
              id="label"
              options={TASK_LABELS}
              autoComplete
              freeSolo
              value={label}
              onChange={(_, value) => handleTextChange({ target: { name: 'label', value } })}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Label"
                  name="label"
                  variant="outlined"
                  size="small"
                  value={label}
                  onChange={handleTextChange}
                />
              )}
            />
          </Grid>
          <Grid item className={classes.gridItem}>
            <Button type="submit" variant="contained" className={classes.addTaskBtn} disabled={!title || !label}>
              {editableTask ? 'Update' : 'Add'} Task
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default NewTask;
