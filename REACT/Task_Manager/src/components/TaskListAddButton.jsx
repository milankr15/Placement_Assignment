import { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

const AddIcon = lazy(() => import('@mui/icons-material/Add'));

import { addTask } from '../features/tasks/taskSlice';

const TaskListAddButton = ({ status }) => {
	const dispatch = useDispatch();
	
	const handleAdd = () => {
		dispatch(addTask({ title: 'New Task', description: 'New Task Description', status }));
	};

	return (<Button fullWidth variant='outlined' color='inherit' startIcon={<Suspense fallback={<div>Loading...</div>}><AddIcon /></Suspense>} onClick={handleAdd}>Add</Button>);
};

export default TaskListAddButton;