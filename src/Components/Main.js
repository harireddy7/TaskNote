import * as React from 'react';
import NewTask from '../Pages/NewTask';
import Navigator from './Navigator';
import { getTasks, updateTasks } from '../useLocalStorage';
import FilterTask from './FilterTask';

const initState = {
	filterLabel: '',
	activeTab: 0,
	editableTask: null,
	tasks: getTasks()
};

const getFilteredTasks = (tasks, filterLabel) => tasks.filter((task) => task.label === filterLabel);

const Main = () => {

	const [state, setState] = React.useReducer((state, newState) => ({ ...state, ...newState }), initState);
	const { filterLabel, activeTab, tasks, editableTask } = state;

	const changeTab = (_, val) => setState({ activeTab: val });

	const addTask = (task) => {
		const TASKS = getTasks();
		const revisedTasks = [task, ...TASKS];

		updateTasks(revisedTasks);

		const revisedState = {
			tasks: revisedTasks,
			activeTab
		};

		if (filterLabel) revisedState.tasks = getFilteredTasks(revisedTasks, filterLabel);
		if (activeTab === 1) revisedState.activeTab = 0;

		setState(revisedState);
	};

	const editTask = (id) => {
		const TASKS = getTasks();
		const targetTask = TASKS.find((task) => task.id === id);
		setState({ editableTask: targetTask });
	};

	const updateTask = (editedTask) => {
		const TASKS = getTasks();
		const index = TASKS.findIndex((task) => task.id === editedTask.id);
		const revisedTasks = [...TASKS];
		revisedTasks[index] = { ...editedTask };

		updateTasks(revisedTasks);

		const revisedState = {
			tasks: revisedTasks,
			activeTab,
			editableTask: null
		}

		if (filterLabel) revisedState.tasks = getFilteredTasks(revisedTasks, filterLabel);
		if (activeTab === 1) revisedState.activeTab = 0;

		setState(revisedState);
	};

	const deleteTask = (id) => {
		const TASKS = getTasks();
		const revisedTasks = TASKS.filter((task) => task.id !== id);
		updateTasks(revisedTasks);

		const revisedState = {
			tasks: revisedTasks
		}

		if (filterLabel) revisedState.tasks = getFilteredTasks(revisedTasks, filterLabel);
		setState(revisedState);
	};

	const updateStatus = (id, status) => {
		const TASKS = getTasks();
		const index = TASKS.findIndex((task) => task.id === id);
		const revisedTasks = [...TASKS];
		revisedTasks[index] = {
			...revisedTasks[index],
			status: !status,
			...(status
				? { completedOn: +new Date() }
				: { createdOn: +new Date(), completedOn: null }),
		};
		updateTasks(revisedTasks);

		const revisedState = {
			tasks: revisedTasks,
			activeTab: status ? 1 : 0
		}

		if (filterLabel) revisedState.tasks = getFilteredTasks(revisedTasks, filterLabel);

		setState(revisedState)
	};

	const filterTasks = (label) => {
		const TASKS = getTasks();

		const revisedState = {
			tasks: TASKS,
			filterLabel: label
		}

		if (label) revisedState.tasks = getFilteredTasks(TASKS, label);

		setState(revisedState);
	};

	return (
		<div>
			<NewTask
				addTask={addTask}
				editableTask={editableTask}
				updateTask={updateTask}
			/>
			<FilterTask filterLabel={filterLabel} onFilter={filterTasks} />
			<Navigator
				tasks={tasks}
				activeTab={activeTab}
				changeTab={changeTab}
				deleteTask={deleteTask}
				editTask={editTask}
				updateStatus={updateStatus}
			/>
		</div>
	);
};

export default Main;
