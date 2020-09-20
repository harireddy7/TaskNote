import React from 'react';
import { Card, makeStyles, CardContent, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '10px',
    margin: '0.5rem	1rem',
    maxWidth: '500px',
    width: '100%',
    background: theme.palette.light.light,
    display: 'flex',
    flexDirection: 'column'
  },
  details: {
    // background: '#ccc'
  },
  content: {
    paddingBottom: '1rem !important'
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: '1rem',
    [theme.breakpoints.only('xs')]: {
      fontSize: '0.9rem'
    }
  },
  subtitle: {
    fontStyle: 'italic',
    marginTop: '0.5rem',
    color: theme.palette.primary.main,
    fontSize: '0.7rem',
    display: 'flex',
    alignItems: 'center',
    '& > .createdDate': {
      marginLeft: '1rem'
    }
  },
  labelChip: {
    fontSize: '0.65rem'
  },
  controls: {
    display: 'flex',
    // background: '#aaa',
    padding: '0.5rem 0',
    marginBottom: '0.5rem',
    '& button': {
      marginLeft: '1rem',
      lineHeight: 1.2,
      borderRadius: '8px',
      textTransform: 'capitalize',
      minWidth: '40px'
    }
  },
  editBtn: {
    // background: '#008000',
    // color: theme.palette.light.main,
    '&:hover': {
      // background: '#006100'
    }
  },
  deleteBtn: {
    // background: '#f00',
    // color: theme.palette.light.main,
    '&:hover': {
      // background: '#ef0000'
    }
  },
  completeBtn: {
    // background: '#00f',
    // color: theme.palette.light.main,
    '&:hover': {
      // background: '#4b0082'
    }
  }
}));

const Task = ({ id, title, label, createdOn, completedOn, status, editTask, deleteTask, updateStatus }) => {
  const classes = useStyles();

  const handleEdit = () => editTask(id);

  const handleDelete = () => deleteTask(id);

  const handleToggleStatus = () => updateStatus(id, status);

  return (
    <Card className={classes.root} id={`task-${id}`}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <div className={classes.title}>{title}</div>
          <div className={classes.subtitle}>
            {/* <Chip color="secondary" size="small" label={label} className={classes.labelChip} /> */}
            <div className="task-label">{label}</div>
            <div className="createdDate">
              {status ? 'Created' : 'Completed'}: {new Date(status ? createdOn : completedOn).toLocaleString()}
            </div>
          </div>
        </CardContent>
      </div>
      <div className={classes.controls}>
        {status && (
          <Button variant="contained" size="small" className={classes.editBtn} onClick={handleEdit}>
            Edit
          </Button>
        )}
        <Button variant="contained" size="small" className={classes.deleteBtn} onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" size="small" className={classes.completeBtn} onClick={handleToggleStatus}>
          {status ? 'Complete' : 'Active'}
        </Button>
      </div>
    </Card>
  );
};

export default Task;

// Task
// Title
// label | date
// edit | delete | complete
