
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/app/store/counter/counter';
import authReducer from '@/app/store/Auth/authSlice';
import userProfileReducer from '@/app/store/Profile/userProfileSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    userProfile : userProfileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch