import { lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

import { moveTask } from '../features/tasks/taskSlice';
const TaskListChip = lazy(() => import('./TaskListChip'));
const Task = lazy(() => import('../components/Task'));
const TaskListAddButton = lazy(() => import('./TaskListAddButton'));

const TaskList = ({ label, color, icon, tasks, status }) => {
	const dispatch = useDispatch();
	const isMobile = useMediaQuery('(max-width:780px)');
	const [{ isOver }, drop] = useDrop(() => ({
		accept: 'Card',
		drop: (item) => moveTaskToList(item.id, status),
		collect: (monitor) => ({
			isOver: Boolean(monitor.isOver())
		})
	}));

	const moveTaskToList = (id, status) => {
		dispatch(moveTask({ id, status }));
	};

	return (
		<Paper elevation={12} sx={{ width: (isMobile) ? '90%' : '30%', height: '100%', padding: 3 }}>
			<Stack height='100%' spacing={2} justifyContent='space-between' alignItems='center'>
                <Suspense fallback={<div>Loading...</div>}>
				    <TaskListChip label={label} color={color} icon={icon} />
                </Suspense>
				<Box width='100%' height='90%' overflow='auto' ref={drop}>
					{tasks.map(({ id, title, description }) => (
						<Suspense fallback={<div>Loading...</div>} key={id}>
                            <Task key={id} title={title} description={description} id={id} status={status} />
                        </Suspense>
					))}
				</Box>
                <Suspense fallback={<div>Loading...</div>}>
				    <TaskListAddButton status={status} />
                </Suspense>
			</Stack>
		</Paper>
	);
};

export default TaskList;