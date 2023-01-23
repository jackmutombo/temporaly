import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { blockSlice } from '../features/block/blockSlice';
import { farmSlice } from '../features/farm/farmSlice';
import { businessSlice } from '../features/business/businessSlice';
import { userSlice } from '../features/user/userSlice';
import { soilSampleSlice } from '../features/soil/soilSampleSlice';
import { leafSampleSlice } from '../features/leaf/leafSampleSlice';
import { excelSlice } from '../features/excelUpload/excelSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    business: businessSlice.reducer,
    farm: farmSlice.reducer,
    block: blockSlice.reducer,
    soilSample: soilSampleSlice.reducer,
    leafSample: leafSampleSlice.reducer,
    excel: excelSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
