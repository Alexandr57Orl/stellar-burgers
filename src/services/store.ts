import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/IngredientsSlice';
import burgerConstructorSlice from './slices/BurgerConstructorSlice';
import userStateSlice from './slices/UserSlices';
import feedStateSlice from './slices/FeedSlice';
import historyOrderStateSlice from './slices/UserHistoryOrder';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice,
  burgerconstructor: burgerConstructorSlice,
  userstate: userStateSlice,
  feeddata: feedStateSlice,
  historyorderstate: historyOrderStateSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
