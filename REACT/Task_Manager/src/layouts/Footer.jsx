import { lazy, Suspense } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const GitHubIcon = lazy(() => import('@mui/icons-material/GitHub'));

const Footer = () => {
	

	return (
		<footer>
			<Box sx={{ width: '95%', marginX: 'auto' }}>
				<Divider />
				<Stack direction='row' justifyContent='space-between' alignItems='center'>
					
					
						<Button size='large' color='inherit' startIcon={<Suspense fallback={<div>Loading...</div>}></Suspense>}>
						
						</Button>
					
				</Stack>
			</Box>
		</footer>
	);
};

export default Footer;