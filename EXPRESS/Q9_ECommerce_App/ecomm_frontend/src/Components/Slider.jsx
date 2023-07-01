import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { sliderItems } from '../Utils/Data';

const Slider = () => {
	const [slideIndex, setSlideIndex] = useState(0);
	const handleClick = (direction) => {
		if (direction === 'left') {
			setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
		} else {
			setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
		}
	};
	return (
		<div className='w-full h-screen overflow-hidden relative flex'>
			<div
				className='w-12 h-12 bg-white rounded-[50%] flex justify-center items-center absolute top-0 bottom-0 left-3 my-auto opacity-75 hover:opacity-100 cursor-pointer z-10' onClick={() => handleClick('left')}>
				<ChevronLeft />
			</div>
			<div className='h-full flex'>
				<div className={`h-screen w-screen flex flex-col items-center md:flex-row ${sliderItems[slideIndex].bg}`} key={sliderItems[slideIndex].id}>
					<div className='w-full h-1/2 md:w-1/2 md:h-full'>
						<img src={sliderItems[slideIndex].img} alt='Slide' className='h-full w-full' />
					</div>
					<div className='w-3/4 md:w-1/2 p-2 md:p-12 h-full flex flex-col justify-center items-start'>
						<h1 className='text-4xl md:text-7xl font-bold'>{sliderItems[slideIndex].title}</h1>
						<p className='my-12 text-lg md:text-xl font-medium tracking-[3px]'>{sliderItems[slideIndex].desc}</p>
						<button className='p-3 text-xl bg-transparent cursor-pointer border border-black'>SHOW NOW</button>
					</div>
				</div>
			</div>
			<div
				className='w-12 h-12 bg-white rounded-[50%] flex justify-center items-center absolute top-0 bottom-0 right-3 my-auto opacity-75 hover:opacity-100 cursor-pointer z-10' onClick={() => handleClick('right')}>
				<ChevronRight />
			</div>
		</div>
	);
};

export default Slider;