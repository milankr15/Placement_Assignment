import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { setUser } from '../features/auth/authSlice';
import PacmanSpinnerLoad from '../components/PacmanSpinnerLoad';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
	const [email, setEmail] = useState('janet.weaver@reqres.in');
	const [password, setPassword] = useState('cityslicka'); 
    const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
            setIsLoading(true);
            const tokenData = await axios.post('https://reqres.in/api/login', { email, password });            
            const userData = await axios.get('https://reqres.in/api/users/2');
            dispatch(setUser({ token: tokenData.data.token, user: userData.data.data }));
            setEmail('');
            setPassword('');
            setIsLoading(false);
            toast.success('Logged In');
            navigate('/', { replace: true });
        } catch (error) {
            throw new Error(error);
        }
	};

    if (isLoading) return <PacmanSpinnerLoad />;

	return (
		<Box height='87vh'>
			<Container component='section' maxWidth='sm' sx={{ height: '100%' }}>
				<Box
					sx={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Login
					</Typography>
					<Box component='form' noValidate sx={{ mt: 1 }}>
						<TextField
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
						/>
						<TextField
							margin='normal'
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
						/>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
							Login
						</Button>
					</Box>
				</Box>
			</Container>
		</Box>
	);
};

export default Login;