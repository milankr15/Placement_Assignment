import { lazy, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import Backdrop from '@mui/material/Backdrop';
import toast from 'react-hot-toast';

const AddIcon = lazy(() => import('@mui/icons-material/Add'));
const DeleteForeverIcon = lazy(() => import('@mui/icons-material/DeleteForever'));
const SaveIcon = lazy(() => import('@mui/icons-material/Save'));
const MenuIcon = lazy(() => import('@mui/icons-material/Menu'));
const CloseIcon = lazy(() => import('@mui/icons-material/Close'));

import { addTask, resetTasks } from '../features/tasks/taskSlice';
import { clearTasks, saveTasks } from '../lib/localForage';

const SpeedDialNav = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const token = useSelector((state) => state.auth.token);
	const tasks = useSelector((state) => state.tasks.tasks);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleDeleteAll = () => {
		dispatch(resetTasks());
		clearTasks();
		setOpen(false);
	};

	const handleSaveTasks = () => {
		clearTasks();
		saveTasks(tasks);
		setOpen(false);
		toast.success('Tasks Saved');
	};

	const handleAddTask = () => {
		dispatch(addTask({ title: 'New Task Title', description: 'New Task Description', status: 0 }));
		setOpen(false);
	};

	const actions = [
		{
			icon: (
				<Suspense fallback={<div>Loading...</div>}>
					<DeleteForeverIcon color='error' />
				</Suspense>
			),
			name: 'Reset',
			onClick: handleDeleteAll
		},
		{
			icon: (
				<Suspense fallback={<div>Loading...</div>}>
					<SaveIcon color='success' />
				</Suspense>
			),
			name: 'Save',
			onClick: handleSaveTasks
		},
		{
			icon: (
				<Suspense fallback={<div>Loading...</div>}>
					<AddIcon color='warning' />
				</Suspense>
			),
			name: 'Add',
			onClick: handleAddTask
		}
	];

	return (
		<Box>
			<Backdrop open={open} />
			<SpeedDial
				ariaLabel='Navigation'
				icon={<SpeedDialIcon openIcon={<CloseIcon />} icon={<MenuIcon />} />}
				sx={{ position: 'fixed', bottom: 32, right: 32 }}
				open={open}
				onOpen={handleOpen}
				onClose={handleClose}
			>
				{actions.map((action) => (
					<SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.onClick} tooltipOpen />
				))}
			</SpeedDial>
		</Box>
	);
};

export default SpeedDialNav;