import { lazy, useState, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

const AddIcon = lazy(() => import('@mui/icons-material/Add'));

import { addTask } from '../features/tasks/taskSlice';

const AddTaskNav = () => {
	const dispatch = useDispatch();
	const [taskDescription, setTaskDescription] = useState('');

	const handleAddTask = () => {
		dispatch(addTask({ title: 'New Task Title', description: (taskDescription) ? taskDescription : 'New Task Description', status: 0 }));
		setTaskDescription('');
	};

	return (
		<Stack width='50%' direction='row' alignItems='center' spacing={2}>
			<TextField size='small' id='outlined-basic' label='Enter Task' variant='outlined' sx={{ flexGrow: 1 }} onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} />
			<Tooltip title='Add Task'>
				<Button size='medium' startIcon={<Suspense fallback={<div>Loading...</div>}><AddIcon /></Suspense>} variant='contained' color='warning' aria-label='add' onClick={handleAddTask}>Add Task</Button>
			</Tooltip>
		</Stack>
	);
};

export default AddTaskNav;