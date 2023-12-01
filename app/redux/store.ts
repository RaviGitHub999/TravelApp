import { configureStore } from '@reduxjs/toolkit';
import Auth from './reducers/auth';
import flightReducer from "../redux/reducers/flightSearch"
export const store = configureStore({
  reducer: {
    Auth,
    flightReducer
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
