import { configureStore } from '@reduxjs/toolkit'
import weatherSliceReducer from './fetchData'
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        weather: weatherSliceReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;