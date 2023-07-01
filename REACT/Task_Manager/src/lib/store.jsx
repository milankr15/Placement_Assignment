import { configureStore } from '@reduxjs/toolkit';

import themeReducer from '../features/theme/themeSlice';
import taskReducer from '../features/tasks/taskSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
	reducer: {
		theme: themeReducer,
		tasks: taskReducer,
        auth: authReducer
	}
});

export default store;