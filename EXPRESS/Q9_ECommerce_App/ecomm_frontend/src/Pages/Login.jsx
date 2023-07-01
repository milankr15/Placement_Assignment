import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Features/apiCall';

const Login = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.currentUser);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const { isFetching, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, [user, navigate]);

	const handleClick = (e) => {
		e.preventDefault();
		login(dispatch, { username, password });
	};

	return (
		<div
			style={{
				background:
					'linear-gradient(rgba(255, 255, 255, 0.5),rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center'
			}}
			className='w-screen h-screen bg-cover flex justify-center items-center'
		>
			<div className='md:w-2/5 w-4/5 p-5 bg-white'>
				<h1 className='text-2xl font-light text-center'>LOGIN</h1>
				<form className='flex flex-col'>
					<input className='outline-none border flex-1 min-w-[40%] my-2.5 p-2.5' type='email' name='email' id='email' placeholder='Email' value={username} onChange={(e) => setUsername(e.target.value)} />
					<input
						className='outline-none border flex-1 min-w-[40%] my-2.5 p-2.5'
						type='password'
						name='password'
						id='password'
						placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={handleClick} disabled={isFetching} type='submit' className='border-none py-4 px-5 mb-2.5 bg-black text-white cursor-pointer'>
						LOGIN
					</button>
                    {error && <span className='text-red-500'>Something went wrong...</span>}
					<Link className='text-xs my-1.5 underline cursor-pointer'>
						<b>FORGOT PASSWORD?</b>
					</Link>
					<Link to='/register' className='text-xs my-1.5 underline cursor-pointer'>
						<b>CREATE A NEW ACCOUNT</b>
					</Link>
				</form>
			</div>
		</div>
	);
};

export default Login;