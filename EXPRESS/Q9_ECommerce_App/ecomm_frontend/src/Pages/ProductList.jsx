import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../Components/Products';

const ProductList = () => {
    const { category } = useParams();
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState('newest');
    
    const handleFilters = (e) => {
        const filter = e.target.value;
        const filterName = e.target.name;

        setFilters({
            ...filters,
            [filterName]: filter
        });
    };

	return (
		<div>
			<h1 className='m-5 text-7xl leading-normal font-bold'>Dresses</h1>
			<div className='flex justify-between'>
				<div className='mx-5 md:m-5 flex flex-col md:block'>
					<span className='text-xl font-medium md:mr-5'>Filter Products:</span>
					<select name='color' id='filter' className='p-2.5 mr-5 my-2.5 md:my-0' onChange={handleFilters}>
						<option disabled>Color</option>
						<option>White</option>
						<option>Black</option>
						<option>Red</option>
						<option>Blue</option>
						<option>Yellow</option>
						<option>Green</option>
					</select>
					<select name='size' id='filter2' className='p-2.5 mr-5 my-2.5 md:my-0' onChange={handleFilters}>
						<option disabled>Size</option>
						<option>XS</option>
						<option>S</option>
						<option>M</option>
						<option>L</option>
						<option>XL</option>
					</select>
				</div>
				<div className='mx-5 md:m-5 flex flex-col md:block'>
					<span className='text-xl font-medium md:mr-5'>Sort Products:</span>
					<select name='sort' id='sort' className='p-2.5 mr-5 my-2.5 md:my-0' value={sort} onChange={(e) => setSort(e.target.value)}>
						<option value='newest'>Newest</option>
                        <option value='asc'>Price (Ascending)</option>
                        <option value='desc'>Price (Descending)</option>
					</select>
				</div>
			</div>
            <Products category={category} filters={filters} sort={sort} />
		</div>
	);
};

export default ProductList;