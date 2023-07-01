import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './lib/store';
import router from './lib/router';
import PacmanSpinnerLoad from './components/PacmanSpinnerLoad';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} fallbackElement={<PacmanSpinnerLoad />} />
		</Provider>
	</React.StrictMode>
);