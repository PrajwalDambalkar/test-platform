import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import testReducer from './slices/testSlice';
import questionReducer from './slices/questionSlice';
import resultReducer from './slices/resultSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tests: testReducer,
    questions: questionReducer,
    results: resultReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
