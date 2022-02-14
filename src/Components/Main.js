import React, { useState } from 'react';
import NewTask from '../Pages/NewTask';
import Navigator from './Navigator';
import { getTasks, updateTasks } from '../useLocalStorage';
import FilterTask from './FilterTask';

const Main = () => {
	const TASKS = getTasks();
	const [tasks, setTasks] = useState(() => TASKS);
	const [tabValue, setTabValue] = useState(0);
	const [editableTask, setEditableTask] = useState(null);

	const changeTab = (_, val) => setTabValue(val);

	const addTask = (task) => {
		const revisedTasks = [task, ...TASKS];

		updateTasks(revisedTasks);
		setTasks(revisedTasks);

		if (tabValue === 1) {
			setTabValue(0);
		}
	};

	const editTask = (id) => {
		const targetTask = TASKS.find((task) => task.id === id);
		setEditableTask(targetTask);
	};

	const updateTask = (editedTask) => {
		const index = TASKS.findIndex((task) => task.id === editedTask.id);
		const revisedTasks = [...TASKS];
		revisedTasks[index] = { ...editedTask };

		setTasks(revisedTasks);
		updateTasks(revisedTasks);

		if (tabValue === 1) {
			setTabValue(0);
		}

		setEditableTask(null);
	};

	const deleteTask = (id) => {
		const revisedTasks = TASKS.filter((task) => task.id !== id);
		updateTasks(revisedTasks);
		setTasks(revisedTasks);
	};

	const updateStatus = (id, status) => {
		const index = TASKS.findIndex((task) => task.id === id);
		const revisedTasks = [...TASKS];
		revisedTasks[index] = {
			...revisedTasks[index],
			status: !status,
			...(status
				? { completedOn: +new Date() }
				: { createdOn: +new Date(), completedOn: null }),
		};
		setTasks(revisedTasks);
		updateTasks(revisedTasks);

		setTabValue(status ? 1 : 0);
	};

	const filterTasks = (label) => {
		if (label) {
			const filteredTasks = TASKS.filter((task) => task.label === label);
			setTasks(filteredTasks);
		} else {
			setTasks(TASKS);
		}
	};

	return (
		<div>
			<NewTask
				addTask={addTask}
				editableTask={editableTask}
				updateTask={updateTask}
			/>
			<FilterTask onFilter={filterTasks} />
			<Navigator
				tasks={tasks}
				tabValue={tabValue}
				changeTab={changeTab}
				deleteTask={deleteTask}
				editTask={editTask}
				updateStatus={updateStatus}
			/>
		</div>
	);
};

export default Main;
