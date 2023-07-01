import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './Lib/Store';
import Router from './Lib/Router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={Router} />
        </Provider>		
	</React.StrictMode>
);