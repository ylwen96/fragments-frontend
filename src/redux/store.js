import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './combinedReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: true,
})

export default store;
