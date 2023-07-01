import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
const Home = lazy(() => import('../Pages/Home'));
const ProductList = lazy(() => import('../Pages/ProductList'));
const ProductInfo = lazy(() => import('../Pages/ProductInfo'));
const Register = lazy(() => import('../Pages/Register'));
const Login = lazy(() => import('../Pages/Login'));
const Bag = lazy(() => import('../Pages/Bag'));
const Success = lazy(() => import('../Pages/Success'));

const Router = createBrowserRouter([
	{
		path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'products/:category',
                element: <ProductList />
            },
            {
                path: 'product/:id',
                element: <ProductInfo />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'bag',
                element: <Bag />
            },
            {
                path: 'success',
                element: <Success />
            }
        ]
	}
]);

export default Router;