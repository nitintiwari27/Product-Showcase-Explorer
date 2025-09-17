import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import filterReducer from "./slices/filterSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});
