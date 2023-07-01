import { lazy } from 'react';
import { useRouteError } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PacmanSpinner = lazy(() => import('../components/PacmanSpinner'));

const Error = () => {
	const error = useRouteError();

	return (
		<Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 4 }}>
			<PacmanSpinner />
			<Typography variant='h3'>Oops! Something went wrong.</Typography>
			<Typography variant='h6'>Status Code: {error.status}</Typography>
			<Typography variant='body1'>Status Message: {error.statusText}</Typography>
		</Box>
	);
};

export default Error;