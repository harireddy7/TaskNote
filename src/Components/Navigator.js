import React, { useEffect } from 'react';
import { Paper, Tabs, Tab, makeStyles, AppBar } from '@material-ui/core';
import ActiveTasks from '../Pages/ActiveTasks';
import CompletedTasks from '../Pages/CompletedTasks';

const useStyles = makeStyles(theme => ({
  tabsRoot: {
    background: theme.palette.primary.main
  },
}));

const Navigator = ({ tasks = [], activeTab, changeTab, editTask, ...rest }) => {
  const classes = useStyles();

  const activeTasks = tasks.filter(task => task.status);
  const completedTasks = tasks.filter(task => !task.status);

  function checkTabsDims() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const tabsRootEl = document.getElementById('tabs-root');
        if (entry.boundingClientRect.bottom < 0) {
          tabsRootEl.classList.add('sticky');
        } else {
          tabsRootEl.classList.remove('sticky');
        }
      });
    }, {});

    return io;
  }

  useEffect(() => {
    const newTaskEl = document.getElementById('new-task-container');
    checkTabsDims().observe(newTaskEl);
  }, []);

  return (
    <>
      <Paper className={classes.tabsRoot} id="tabs-root">
        <AppBar position="static" color="primary">
          <Tabs
            centered
            value={activeTab}
            onChange={changeTab}
          >
            <Tab label={`Active (${activeTasks.length})`} />
            <Tab label={`Completed (${completedTasks.length})`} />
          </Tabs>
        </AppBar>
      </Paper>
      <div className="" id="tab-content">
        {activeTab === 0 && <ActiveTasks activeTasks={activeTasks} editTask={editTask} {...rest} />}
        {activeTab === 1 && <CompletedTasks completedTasks={completedTasks} {...rest} />}
      </div>
    </>
  );
};

export default Navigator;
