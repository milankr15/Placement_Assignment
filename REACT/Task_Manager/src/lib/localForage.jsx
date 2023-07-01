import localforage from 'localforage';

localforage.config({
	driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
	storeName: 'tasks',
	description: 'Local storage for the Todo App'
});

const localTaskStore = localforage.createInstance({
	name: 'Todo App',
	description: 'Local storage for the Todo App'
});

export const saveTasks = async (tasks) => {
	await localTaskStore.setItem('tasks', tasks);
};

export const loadTasks = async () => {
	const tasks = await localTaskStore.getItem('tasks');
	return tasks;
};

export const clearTasks = async () => {
	await localTaskStore.clear();
};