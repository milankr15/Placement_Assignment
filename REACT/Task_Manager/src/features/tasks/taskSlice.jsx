import { createSlice, nanoid } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
	tasks: [
		{
			id: 1,
			title: 'Task 1',
			description: 'This is the first task',
			status: 0,
		},
		{
			id: 2,
			title: 'Task 2',
			description: 'This is the second task',
			status: 1,
		},
		{
			id: 3,
			title: 'Task 3',
			description: 'This is the third task',
			status: 2,
		},
	],
};

const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action) => {
			const newTask = {
				id: nanoid(),
				title: action.payload.title,
				description: action.payload.description,
				status: action.payload.status,
			};
			state.tasks.push(newTask);
            toast.success('Task Added');
		},
		deleteTask: (state, action) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            toast.success('Task Deleted');
		},
		editTask: (state, action) => {
			const { id, taskTitle, taskDescription } = action.payload;
			const task = state.tasks.find((task) => task.id === id);
			task.title = taskTitle;
			task.description = taskDescription;
            toast.success('Task Edited');
		},
		moveTask: (state, action) => {
			const { id, status } = action.payload;
			const task = state.tasks.find((task) => task.id === id);
			task.status = status;
            toast.success('Task Moved');
		},
		resetTasks: (state) => {
			state.tasks = initialState.tasks;
            toast.success('App Reset');
		},
		loadSavedTasks: (state, action) => {
			state.tasks = action.payload;
            toast.success('Tasks Loaded');
		},
	},
});

export const { addTask, deleteTask, editTask, moveTask, resetTasks, loadSavedTasks } = taskSlice.actions;

export default taskSlice.reducer;