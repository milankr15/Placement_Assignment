import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const user = true;

    useEffect(() => {
        if (user) {
            navigate('/', { replace: true });
        }
    }, []);
	return (
		<div
			style={{ background: 'linear-gradient(rgba(255, 255, 255, 0.5),rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center' }}
			className='w-screen h-screen bg-cover flex justify-center items-center'
		>
			<div className='md:w-1/2 w-4/5 p-5 bg-white'>
				<h1 className='text-2xl font-light'>CREATE AN ACCOUNT</h1>
				<form className='flex flex-wrap'>
					<input className='outline-none border flex-1 min-w-[40%] mt-5 mr-2.5 p-2.5' type='text' name='fname' id='fname' placeholder='First Name' />
					<input className='outline-none border flex-1 min-w-[40%] mt-5 mr-2.5 p-2.5' type='text' name='lname' id='lname' placeholder='Last Name' />
					<input className='outline-none border flex-1 min-w-[40%] mt-5 mr-2.5 p-2.5' type='text' name='uname' id='uname' placeholder='User Name' />
					<input className='outline-none border flex-1 min-w-[40%] mt-5 mr-2.5 p-2.5' type='email' name='email' id='email' placeholder='Email' />
					<input className='outline-none border flex-1 min-w-[40%] mt-5 mr-2.5 p-2.5' type='password' name='password' id='password' placeholder='Password' />
					<input className='outline-none border flex-1 min-w-[40%] mt-5 mr-2.5 p-2.5' type='password' name='cpassword' id='cpassword' placeholder='Confirm Password' />
                    <span className='text-xs my-5'>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></span>
                    <button type='submit' className='min-w-[40%] border-none py-4 px-5 bg-black text-white cursor-pointer'>CREATE</button>
				</form>
			</div>
		</div>
	);
};

export default Register;