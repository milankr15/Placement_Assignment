import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';;
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import TaskIcon from '@mui/icons-material/Task';
import LoopIcon from '@mui/icons-material/Loop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { deleteTask, editTask, moveTask } from '../features/tasks/taskSlice';

const Task = ({ id, title, description, status }) => {
	const dispatch = useDispatch();
	const [taskTitle, setTaskTitle] = useState(title);
	const [taskDescription, setTaskDescription] = useState(description);
	const [editForm, setEditForm] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'Card',
		item: { id: id },
		collect: (monitor) => ({
			isDragging: Boolean(monitor.isDragging())
		})
	}));

	const handleMenuOpen = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleEditTaskForm = () => {
		setAnchorEl(null);
		setEditForm(true);
	};

	const saveEditTask = () => {
		dispatch(editTask({ id, taskTitle, taskDescription }));
		setEditForm(false);
	};

	const handleDeleteTask = () => {
		dispatch(deleteTask(id));
		setAnchorEl(null);
	};

	return (
		<Card ref={drag} variant='outlined' sx={{ height: 'auto', marginBottom: 3, opacity: (isDragging) ? 0.5 : 1 }}>
			{editForm ? (
				<Box sx={{ padding: 2 }}><TextField label='Task Title' value={taskTitle} fullWidth onChange={(e) => setTaskTitle(e.target.value)} /></Box>
			) : (
				<CardHeader
					subheader={title}
					action={
						<IconButton
							id='task-menu-button'
							color='inherit'
							onClick={handleMenuOpen}
							aria-controls={open ? 'task-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={open ? 'true' : undefined}
						>
							<MoreVertIcon />
						</IconButton>
					}
					sx={{ paddingBottom: 1 }}
				/>
			)}

			<Menu id='task-menu' anchorEl={anchorEl} open={open} MenuListProps={{ 'aria-labelledby': 'task-menu-button' }} onClose={handleMenuClose}>
				<MenuItem onClick={handleEditTaskForm} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
					<EditIcon />
					<Typography variant='body1'>Edit Task</Typography>
				</MenuItem>
				<MenuItem onClick={handleDeleteTask} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
					<DeleteIcon />
					<Typography variant='body1'>Delete Task</Typography>
				</MenuItem>
				{status === 0 ? (null) : (
					<MenuItem onClick={() => dispatch(moveTask({ id: id, status: 0 }))} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
						<TaskIcon />
						<Typography variant='body1'>Move To To-Do</Typography>
					</MenuItem>
				)}
				{(status === 1) ? (null) : (
					<MenuItem onClick={() => dispatch(moveTask({ id: id, status: 1 }))} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
						<LoopIcon />
						<Typography variant='body1'>Move To In-Progress</Typography>
					</MenuItem>
				)}
				{(status === 2) ? (null) : (
					<MenuItem onClick={() => dispatch(moveTask({ id: id, status: 2 }))} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
						<CheckCircleIcon />
						<Typography variant='body1'>Move To Completed</Typography>
					</MenuItem>
				)}
			</Menu>

			{editForm ? (
				<Box sx={{ padding: 2 }}>
					<TextField label='Task Description' multiline rows={3} value={taskDescription} fullWidth onChange={(e) => setTaskDescription(e.target.value)} />
				</Box>
			) : (
				<CardContent sx={{ paddingTop: 1 }}>
					<Typography variant='body1' fontSize='18px' component='div'>
						{description}
					</Typography>
				</CardContent>
			)}

			{editForm ? (
				<CardActions>
					<Stack width='100%' direction='row' spacing={2}>
						<Button
							variant='cotained'
							size='small'
							fullWidth
							startIcon={<SaveIcon color='success' />}
							onClick={saveEditTask}
						>
							Save
						</Button>
						<Button variant='cotained' size='small' fullWidth startIcon={<CloseIcon color='error' />} onClick={() => setEditForm(false)}>
							Cancel
						</Button>
					</Stack>
				</CardActions>
			) : (
				<></>
			)}
		</Card>
	);
};

export default Task;
