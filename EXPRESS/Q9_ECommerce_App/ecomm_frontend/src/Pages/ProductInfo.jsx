import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Plus, Minus } from 'lucide-react';
import { addProduct } from '../Features/cart';
import { publicRequest } from '../requestMethods';

const ProductInfo = () => {
	const { id } = useParams();
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	const [color, setColor] = useState('');
	const [size, setSize] = useState('');
	const dispatch = useDispatch();

	const handleQuantity = (type) => {
		if (type === 'dec') {
			quantity > 1 && setQuantity(quantity - 1);
		} else {
			setQuantity(quantity + 1);
		}
	};

	const handleClick = () => {
		dispatch(addProduct({ ...product, quantity, color, size }));
	};

	useEffect(() => {
		const getProduct = async (id) => {
			try {
				const res = await publicRequest.get(`/products/find/${id}`);
				console.log(res);
				setProduct(res.data);
			} catch {}
		};
		getProduct(id);
	}, [id]);

	return (
		<div className='p-2.5 md:p-12 flex flex-col md:flex-row'>
			<div className='flex-1'>
				<img src={`${product.img}`} alt='Product_Image' className='w-full h-[50vh] md:h-[90vh] object-cover' />
			</div>
			<div className='flex-1 p-2.5 md:py-0 md:px-12'>
				<h1 className='text-6xl font-extralight'>{product.name}</h1>
				<p className='my-5'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
					iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget tristique tortor pretium ut. Curabitur elit justo, consequat id
					condimentum ac, volutpat ornare.
					{product.desc}
				</p>
				<span className='text-[40px] font-thin'>$ {product.price}</span>
				<div className='w-full my-8 flex justify-between md:w-1/2'>
					<div className='flex items-center'>
						<span className='text-xl font-extralight'>Color:</span>
						{product.color?.map((c, index) => (
							<div onClick={() => setColor(c.toLowerCase())} className={`cursor-pointer border w-5 h-5 rounded-[50%] m-1.5 ${color === c.toLowerCase ? 'border-2 border-blue-500' : ''}`} style={{ backgroundColor: c.toLowerCase() }} key={c+index}></div>
						))}
					</div>
					<div className='flex items-center'>
						<span className='text-xl font-extralight'>Size</span>
						<select name='filter' id='filter' className='ml-2.5 p-1.5' value={size} onChange={(e) => setSize(e.target.value)}>
							{product.size?.map((s, index) => (
								<option value={s} key={s + index}>
									{s}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className='w-full flex justify-between items-center md:w-1/2'>
					<div className='flex items-center font-bold'>
						<Minus className='cursor-pointer' onClick={() => handleQuantity('dec')} />
						<span className='w-8 h-8 rounded-xl border flex justify-center items-center mx-1.5'>{quantity}</span>
						<Plus className='cursor-pointer' onClick={handleQuantity} />
					</div>
					<button onClick={handleClick} className='p-4 border-2 bg-white cursor-pointer font-medium hover:bg-black hover:text-white'>
						ADD TO BAG
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductInfo;
