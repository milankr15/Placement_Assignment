import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Heart } from 'lucide-react';

const Product = ({ item }) => {
	return (
		<div className='flex-1 m-2 min-w-[400px] h-[500px] flex justify-center items-center bg-[#F5FBFD] relative'>
			<div className='w-[350px] h-[350px] rounded-[50%] bg-white absolute'></div>
			<img src={item.img} alt='Image' className='h-[75%] z-10' />
			<div className='w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 hover:bg-black/20 z-20 flex justify-center items-center'>
				<div className='w-14 h-14 rounded-[50%] bg-white flex justify-center items-center m-3 hover:bg-[#E9F5F5] hover:scale-110 hover:cursor-pointer'>
					<ShoppingBag />
				</div>
				<Link to={`/product/${item._id}`}>
					<div className='w-14 h-14 rounded-[50%] bg-white flex justify-center items-center m-3 hover:bg-[#E9F5F5] hover:scale-110 hover:cursor-pointer'>
						<Search />
					</div>
				</Link>
				<div className='w-14 h-14 rounded-[50%] bg-white flex justify-center items-center m-3 hover:bg-[#E9F5F5] hover:scale-110 hover:cursor-pointer'>
					<Heart />
				</div>
			</div>
		</div>
	);
};

export default Product;
