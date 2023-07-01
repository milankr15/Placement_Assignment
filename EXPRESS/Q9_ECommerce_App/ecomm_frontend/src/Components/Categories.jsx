import CategoryItem from './CategoryItem';
import { categories } from '../Utils/Data';

const Categories = () => {
	return (
		<div className='p-0 flex justify-between flex-col md:p-5 md:flex-row'>
			{categories.map((item) => (
				<CategoryItem item={item} key={item.id} />
			))}
		</div>
	);
};

export default Categories;