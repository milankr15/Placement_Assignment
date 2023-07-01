import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';

const Products = ({ category, filters, sort }) => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState(products);

	useEffect(() => {
		const getProducts = async () => {
			try {
				const url = category ? `http://localhost:5000/api/products?category=${category}` : 'http://localhost:5000/api/products/';
				const response = await axios.get(url);
				setProducts(response.data);
			} catch (error) {}
		};
		getProducts();
	}, [category]);

	useEffect(() => {
		category && setFilteredProducts(products.filter((item) => Object.entries(filters).every(([key, value]) => item[key].includes(value))));
	}, [products, category, filters]);

	useEffect(() => {
		if (sort === 'newest') {
			setFilteredProducts((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
		} else if (sort === 'asc') {
			setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
		} else {
			setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
		}
	}, [sort]);

	return (
		<div className='p-5 flex flex-col md:flex-row md:flex-wrap justify-between items-center'>
			{category
				? filteredProducts.map((item, index) => <Product item={item} key={`item.id+${index}`} />)
				: products.slice(0, 8).map((item, index) => <Product item={item} key={`item.id+${index}`} />)}
		</div>
	);
};

export default Products;