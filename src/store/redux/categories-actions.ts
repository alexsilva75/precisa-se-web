import { categoriesActions } from "./categories";

import axios, { AxiosError } from "axios";

import options from "../../globalOptions";

export const fetchAndSetCategories = (params: any) => {
  return async (dispatch: any) => {
    const response = await axios.get(`${options.baseURL}/api/v1/category`, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });

    if (response.status === 200) {
      console.log("Categories Response: ", response);
      dispatch(categoriesActions.setCategories(response.data.categories));
    }
  };
};

export const fetchAndSetFilteredCategories = (params: any) => {
  return async (dispatch: any) => {
    const response = await axios.get(
      `${options.baseURL}/api/v1/category?s=${params.search}`,
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }
    );

    if (response.status === 200) {
      //
      dispatch(
        categoriesActions.setFilteredCategories(response.data.categories)
      );
    }
  };
};
