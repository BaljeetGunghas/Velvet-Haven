
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/app/store/counter/counter';
import authReducer from '@/app/store/Auth/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch