import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
	darkMode: false
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
			toast.success('Theme Toggled!');
        }
	}
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;