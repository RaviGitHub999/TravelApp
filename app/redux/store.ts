import { configureStore } from '@reduxjs/toolkit';
import Auth from './reducers/auth';
export const store = configureStore({
  reducer: {
    Auth,
  },
  middleware: getDefaultMiddleware =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
