import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import categoriesSlice from "./categories";

import usersSlice from "./users";

const store = configureStore({
  reducer: { users: usersSlice.reducer, categories: categoriesSlice.reducer },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
