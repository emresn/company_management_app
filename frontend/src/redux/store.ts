import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import alertSlice from '../viewModels/alertSlice';
import authSlice from '../viewModels/authSlice';
import productSlice from '../viewModels/productSlice';



export function makeStore() {
  return configureStore({
    reducer: {
      productState: productSlice,
      alertState: alertSlice,
      auth: authSlice
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
        // Ignore these action types
        // ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['ProductState/FetchProductsAsync/fulfilled', 'payload.config.adapter'],
        // Ignore these paths in the state
      //   ignoredActionPaths: ['payload.config.transformRequest', 'payload.config.adapter', 'payload.config.transformResponse'],
      // },
    }),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
