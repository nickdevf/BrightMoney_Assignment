import { configureStore } from '@reduxjs/toolkit';
import billReducer from '../features/bill/billSlice';

const store = configureStore({
    reducer: {
        bill: billReducer,
    },
});

export default store;