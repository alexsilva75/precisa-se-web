import { createSlice } from "@reduxjs/toolkit";

interface CategoriesState {
  categories: [];
  filteredCategories: [];
}

const initialState = {
  categories: [],
  filteredCategories: [],
} as CategoriesState;

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setFilteredCategories(state, action) {
      state.filteredCategories = action.payload;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice;
