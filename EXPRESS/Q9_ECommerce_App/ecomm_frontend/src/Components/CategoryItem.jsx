import { Link } from 'react-router-dom';

const CategoryItem = ({ item }) => {
	return (
		<div className='m-1 h-[30vh] md:flex-1 md:h-[70vh] relative'>
			<Link to={`/products/${item.category}`}>
                <img src={item.img} alt='Category' className='w-full h-full object-cover' />
                <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/25'>
                    <h1 className='text-5xl font-bold text-white mb-5'>{item.title}</h1>
                    <button className='border-none p-2.5 bg-white text-gray-400 cursor-pointer font-semibold'>SHOW NOW</button>
                </div>
            </Link>
		</div>
	);
};

export default CategoryItem;