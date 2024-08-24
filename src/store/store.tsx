import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { api } from "./api";
import { testSlice } from "./test";

const reducers = combineSlices({ test: testSlice.reducer }, api);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middleware = (getDefaultMiddleware: any) => getDefaultMiddleware().concat([api.middleware]);

export type RootState = ReturnType<typeof reducers>;

export function setupStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: reducers,
    middleware,
    preloadedState,
  });
  // Required for refetchOnFocus/refetchOnReconnect behaviours
  setupListeners(store.dispatch);

  return store;
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
