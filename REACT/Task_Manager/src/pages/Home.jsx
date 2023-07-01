import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';

const TaskIcon = lazy(() => import('@mui/icons-material/Task'));
const LoopIcon = lazy(() => import('@mui/icons-material/Loop'));
const CheckCircleIcon = lazy(() => import('@mui/icons-material/CheckCircle'));

const TaskList = lazy(() => import('../components/TaskList'));

const Home = () => {
    const navigate = useNavigate();
	const tasks = useSelector((state) => state.tasks.tasks);
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
	const [todos, setTodos] = useState([]);
	const [inProgress, setInProgress] = useState([]);
	const [completed, setCompleted] = useState([]);
	const isMobile = useMediaQuery('(max-width:780px)');

	useEffect(() => {
		const addTasks = () => {
			setTodos(tasks.filter((task) => task.status === 0));
			setInProgress(tasks.filter((task) => task.status === 1));
			setCompleted(tasks.filter((task) => task.status === 2));
		};
		addTasks();
	}, [tasks]);

    useEffect(() => {
        if(token == null) {
            navigate('/login', { replace: true });            
        }
    }, [user, token]);

	const Lists = [
		{
			label: 'To-Do',
			color: 'primary',
			icon: (
				<Suspense fallback={<div>Loading...</div>}>
					<TaskIcon />
				</Suspense>
			),
			tasks: todos,
			status: 0
		},
		{
			label: 'In Progress',
			color: 'secondary',
			icon: (
				<Suspense fallback={<div>Loading...</div>}>
					<LoopIcon />
				</Suspense>
			),
			tasks: inProgress,
			status: 1
		},
		{
			label: 'Completed',
			color: 'success',
			icon: (
				<Suspense fallback={<div>Loading...</div>}>
					<CheckCircleIcon />
				</Suspense>
			),
			tasks: completed,
			status: 2
		}
	];

	return (
		<DndProvider backend={HTML5Backend}>
			<Stack
				marginY={5}
				direction={isMobile ? 'column' : 'row'}
				justifyContent='center'
				alignItems='center'
				spacing={4}
				height={isMobile ? '' : '80vh'}
			>
				{Lists.map(({ label, color, icon, tasks, status }) => (
					<Suspense fallback={<div>Loading...</div>} key={label}>
						<TaskList key={label} label={label} color={color} icon={icon} tasks={tasks} status={status} />
					</Suspense>
				))}
			</Stack>
		</DndProvider>
	);
};

export default Home;