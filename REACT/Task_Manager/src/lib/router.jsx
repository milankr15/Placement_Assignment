import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';

const Error = lazy(() => import('../pages/Error'));
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Home />,
			},
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '*',
                element: <Error />
            }
		]
	}
]);

export default router;