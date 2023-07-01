import Stack from '@mui/material/Stack';
import PacmanLoader from 'react-spinners/PacmanLoader';

const PacmanSpinner = () => {
	return (
		<Stack width='100%' height='100vh' justifyContent='center' alignItems='center' >
			<PacmanLoader color='#FF9800' loading margin={2} size={75} speedMultiplier={2} />
		</Stack>
	);
};

export default PacmanSpinner;