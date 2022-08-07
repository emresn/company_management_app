import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import alertSlice from '../viewModels/alertSlice';
import productSlice from '../viewModels/productSlice';



export function makeStore() {
  return configureStore({
    reducer: {
      productState: productSlice,
      alertState: alertSlice
      
    },
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
