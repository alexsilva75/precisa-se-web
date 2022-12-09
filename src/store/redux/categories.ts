import { createSlice } from "@reduxjs/toolkit";

interface CategoriesState {
  isSendingRequest: boolean;
  isLoading: boolean;
  isLoadingFiltered: boolean;
  categories: [];
  filteredCategories: [];
  requestResult: { status: string; message: string };
  editCategoryId: number | null;
  paginationData: {
    currentPage: number | null;
    prevPage: number | null;
    nextPage: number | null;
    totalPages: number;
    resultCount: number;
  };
}

const initialState = {
  categories: [],
  filteredCategories: [],
  isSendingRequest: false,
  isLoading: false,
  isLoadingFiltered: false,
  requestResult: { status: "", message: "" },
  editCategoryId: null,
  paginationData: {
    currentPage: null,
    prevPage: null,
    nextPage: null,
    totalPages: 0,
    resultCount: 0,
  },
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
      //console.log("Is Loading action: ", action.payload);
      state.isLoading = action.payload;
    },
    setIsLoadingFiltered(state, action) {
      //console.log("Is Loading Filtered: ", action.payload);
      state.isLoadingFiltered = action.payload;
    },
    setEditCategoryId(state, action) {
      state.editCategoryId = action.payload;
    },
    setPaginationData(state, action) {
      state.paginationData = action.payload;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice;
