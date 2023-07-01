import { Facebook, Instagram, Twitter, Linkedin, Home, Mail, Phone } from 'lucide-react';

const Footer = () => {
	return (
		<div className='flex flex-col md:flex-row'>
			<div className='flex-1 flex flex-col p-5'>
				<h1 className='font-bold text-4xl'>SHOP.</h1>
				<p className='my-5 text-sm text-gray-500'>
					There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by
					injected humour, or randomised words which don't look even slightly believable.
				</p>
				<div className='flex'>
					<button className='w-12 h-12 rounded-[50%] bg-[#3B5999] flex justify-center items-center mr-5'>
						<Facebook color='white' />
					</button>
					<button className='w-12 h-12 rounded-[50%] bg-[#E4405F] flex justify-center items-center mr-5'>
						<Instagram color='white' />
					</button>
					<button className='w-12 h-12 rounded-[50%] bg-[#55ACEE] flex justify-center items-center mr-5'>
						<Twitter color='white' />
					</button>
					<button className='w-12 h-12 rounded-[50%] bg-[#0072B1] flex justify-center items-center mr-5'>
						<Linkedin color='white' />
					</button>
				</div>
			</div>
			<div className='flex-1 p-5'>
				<h3 className='text-xl font-semibold mb-8'>Useful Links</h3>
				<ul className='m-0 p-0 list-none flex flex-wrap'>
					<li className='w-1/2 mb-2.5'>Home</li>
					<li className='w-1/2 mb-2.5'>Cart</li>
					<li className='w-1/2 mb-2.5'>Man Fashion</li>
					<li className='w-1/2 mb-2.5'>Woman Fashion</li>
					<li className='w-1/2 mb-2.5'>Accessories</li>
					<li className='w-1/2 mb-2.5'>My Account</li>
					<li className='w-1/2 mb-2.5'>Order Tracking</li>
					<li className='w-1/2 mb-2.5'>Wishlist</li>
					<li className='w-1/2 mb-2.5'>Wishlist</li>
					<li className='w-1/2 mb-2.5'>Terms</li>
				</ul>
			</div>
			<div className='flex-1 p-5'>
				<h3 className='text-xl font-semibold mb-8'>Contact</h3>
				<div className='mb-5 flex items-center'>
					<Home className='mr-5' size={24} /> Gandhinagar, Gujarat, India
				</div>
				<div className='mb-5 flex items-center'>
					<Phone className='mr-5' size={24} /> +91-1234567890
				</div>
				<div className='mb-5 flex items-center'>
					<Mail className='mr-5' size={24} /> contact@shop.dev
				</div>
				<img src='https://i.ibb.co/Qfvn4z6/payment.png' alt='Payments' />
			</div>
		</div>
	);
};

export default Footer;