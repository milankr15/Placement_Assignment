import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../requestMethods';
import StripeCheckout from 'react-stripe-checkout';

const Bag = () => {
	const cart = useSelector((state) => state.cart);
	const [stripeToken, setStripeToken] = useState(null);
	const navigate = useNavigate();

	const onToken = (token) => {
		setStripeToken(token);
	};

	useEffect(() => {
		const makeRequest = async () => {
			try {
				const res = await userRequest.post('/checkout/payment', {
					tokenId: stripeToken.id,
					amount: 500
				});
				navigate('/success', { state: { stripeData: res.data, products: cart } });
			} catch {}
		};
		stripeToken && makeRequest();
	}, [stripeToken, cart.total, navigate]);

	return (
		<div className='p-2.5 md:p-5'>
			<h1 className='text-light text-center text-4xl'>YOUR BAG</h1>
			<div className='flex justify-between items-center p-5'>
				<button className='p-2.5 font-semibold cursor-pointer bg-transparent border-2 border-black'>CONTINUE SHOPPING</button>
				<div className='hidden md:block'>
					<span className='underline cursor-pointer mx-2.5'>Shopping Bag({cart.products.length})</span>
					<span className='underline cursor-pointer mx-2.5'>Your Whislist(0)</span>
				</div>
				<button className='p-2.5 font-semibold cursor-pointer bg-black text-white'>CHECKOUT NOW</button>
			</div>
			<div className='flex flex-col justify-between gap-4 md:flex-row'>
				<div className='flex-[3]'>
					{cart.products.map((product) => (
						<div className='flex flex-col justify-between md:flex-row' key={product._id}>
							<div className='flex-[2] flex'>
								<img src={product.img} alt='Product_Image' className='w-[200px]' />
								<div className='p-5 flex flex-col justify-around'>
									<span>
										<b>Product:</b> {product.title}
									</span>
									<span>
										<b>ID:</b> {product._id}
									</span>
									<div className='w-5 h-5 rounded-[50%] bg-black'></div>
									<span>
										<b>Size:</b> {product.size}
									</span>
								</div>
							</div>
							<div className='flex-[1] flex flex-row md:flex-col justify-between px-12 md:px-0 md:justify-center items-center'>
								<div className='flex items-center md:mb-5'>
									<div className='text-2xl m-3 md:m-1.5'>Quantity: {product.quantity}</div>
								</div>
								<div className='text-3xl font-extralight'>$ {product.price * product.quantity}</div>
							</div>
						</div>
					))}
					<hr className='bg-[#EEEEEE] border-none h-0.5' />
				</div>
				<div className='flex-[1] border rounded-[10px] p-5 h-1/2'>
					<h1 className='text-4xl font-extralight'>ORDER SUMMARY</h1>
					<div className='m-8 flex justify-between'>
						<span>Subtotal</span>
						<span>$ ${cart.total}</span>
					</div>
					<div className='m-8 flex justify-between'>
						<span>Estimated Shipping</span>
						<span>$ 5.90</span>
					</div>
					<div className='m-8 flex justify-between'>
						<span>Shipping Discount</span>
						<span>$ -5.90</span>
					</div>
					<div className='m-8 flex justify-between text-2xl font-medium'>
						<span>Total</span>
						<span>$ {cart.total}</span>
					</div>
					<StripeCheckout
						name={`Jaimin's Shop`}
						image='https://avatars.githubusercontent.com/u/73186203?v=4'
						billingAddress
						shippingAddress
						description={`Your total is $${cart.total}`}
						amount={cart.total * 100}
						token={onToken}
						stripeKey={import.meta.env.VITE_STRIPE_KEY}
					>
						<button className='w-full p-2.5 bg-black text-white font-semibold'>CHECKOUT NOW</button>
					</StripeCheckout>
				</div>
			</div>
		</div>
	);
};

export default Bag;
