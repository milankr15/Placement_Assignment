import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Features/user';

const Navbar = () => {
	const navigate = useNavigate();
    const dispatch = useDispatch();
	const user = useSelector((state) => state.user.currentUser);
	const products = useSelector((state) => state.cart.products);

    const handleLogout = () => {
        dispatch(logout());
    };

	return (
		<div className='h-12 md:h-16'>
			<div className='py-2.5 px-0 md:px-5 md:py-2.5 flex justify-between items-center'>
				<div className='flex-1 flex items-center'>
					<p className='hidden md:block cursor-pointer'>EN</p>
					<div className='border flex items-center ml-6 p-1.5'>
						<input type='text' className='border-none outline-none w-[50px] md:w-full' placeholder='Search' />
						<Search color='gray' size={16} />
					</div>
				</div>
				<div className='flex-1 text-center'>
					<h1 className='font-bold text-2xl md:text-4xl cursor-pointer' onClick={() => navigate('/')}>
						SHOP.
					</h1>
				</div>
				<div className='flex-[1.5] md:flex-[1] flex justify-center items-center md:justify-end'>
					{user ? (
						<>
							<button className='text-xs ml-[10px] md:ml-6 font-medium' onClick={handleLogout}>
								LOGOUT
							</button>
						</>
					) : (
						<>
							<Link to='/register' className='text-xs ml-[10px] md:ml-6 font-medium'>
								REGISTER
							</Link>
							<Link to='/login' className='text-xs ml-[10px] md:ml-6 font-medium'>
								LOGIN
							</Link>
						</>
					)}
					<Link to='/bag' className='text-xs ml-[10px] md:ml-6 flex items-center relative'>
						<ShoppingBag />
						<div className='absolute top-[-8px] right-[-8px] w-5 h-5 text-white text-xs font-semibold bg-black rounded-[50%] flex justify-center items-center'>
							{products.length}
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
