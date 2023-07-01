import { Send } from 'lucide-react';

const Newsletter = () => {
	return (
		<div className='h-[40vh] bg-[#FCF5F5] flex justify-center items-center flex-col'>
			<h1 className='text-7xl leading-normal font-bold mb-5'>Newsletter</h1>
			<p className='text-2xl font-light mb-5 text-center'>Get Timely Updates About Your Favourite Products.</p>
			<div className='w-4/5 md:w-1/2 h-10 bg-white flex justify-between items-center border'>
				<input type='email' name='email' id='email' placeholder='Your E-Mail' className='border-none outline-none flex-[8] pl-5' />
                <button className='flex-[2] h-full border-none bg-black flex justify-center items-center'><Send color='white' /></button>
			</div>
		</div>
	);
};

export default Newsletter;