import { createSlice } from "@reduxjs/toolkit";

interface CategoriesState {
  isSendingRequest: boolean;
  isLoading: boolean;
  categories: [];
  filteredCategories: [];
  requestResult: { status: string; message: string };
}

const initialState = {
  categories: [],
  filteredCategories: [],
  isSendingRequest: false,
  isLoading: false,
  requestResult: { status: "", message: "" },
} as CategoriesState;

const categoriesSlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    setCategories(state, action) {
      state.categories = action.payload ? action.payload : [];
    },
    setFilteredCategories(state, action) {
      state.filteredCategories = action.payload ? action.payload : [];
    },
    setIsSendingRequest(state, action) {
      state.isSendingRequest = action.payload;
    },
    setRequestResult(state, action) {
      state.requestResult = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
    setIsLoading(state, action) {
      console.log("Is Loading action: ", action.payload);
      state.isLoading = action.payload;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice;
