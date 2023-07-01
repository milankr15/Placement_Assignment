import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const Announcement = lazy(() => import('./Layouts/Announcement'));
const Navbar = lazy(() => import('./Layouts/Navbar'));
const Newsletter = lazy(() => import('./Layouts/Newsletter'));
const Footer = lazy(() => import('./Layouts/Footer'));

const App = () => {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}><Navbar /></Suspense>
			<Suspense fallback={<div>Loading...</div>}><Announcement /></Suspense>
			<Suspense fallback={<div>Loading...</div>}><Outlet /></Suspense>
            <Suspense fallback={<div>Loading...</div>}><Newsletter /></Suspense>
            <Suspense fallback={<div>Loading...</div>}><Footer /></Suspense>
		</>
	);
};

export default App;