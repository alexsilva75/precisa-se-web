import { categoriesActions } from "./categories";

import axios from "axios";

import options from "../../globalOptions";

export const fetchAndSetCategories = (params: any) => {
  return async (dispatch: any) => {
    const page = params.page ? params.page : 1;
    dispatch(categoriesActions.setIsLoading(true));
    console.log("Sending request for page: ", page);
    const response = await axios.get(
      `${options.baseURL}/api/v1/category?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Categories Response: ", response);
      dispatch(categoriesActions.setCategories(response.data.categories));
      dispatch(
        categoriesActions.setPaginationData({
          currentPage: response.data.currentPage,
          prevPage: response.data.prevPage,
          nextPage: response.data.nextPage,
          resultCount: response.data.count,
          totalPages: response.data.pages,
        })
      );
    }
    dispatch(categoriesActions.setIsLoading(false));
  };
};

export const fetchAndSetFilteredCategories = (params: any) => {
  return async (dispatch: any) => {
    dispatch(categoriesActions.setIsLoadingFiltered(true));
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
      //console.log("Filtered Categories: ", response.data.categories);
    }
    dispatch(categoriesActions.setIsLoadingFiltered(false));
  };
};

export const createNewCategory = (params: any) => {
  return async (dispatch: any) => {
    dispatch(categoriesActions.setIsSendingRequest(true));

    console.log("Form Data: ", params.formData);
    try {
      const response = await axios.post(
        `${options.baseURL}/api/v1/category`,
        params.formData,
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );

      if (response.status === 200) {
        //
        dispatch(
          categoriesActions.setRequestResult({
            status: "success",
            message: "A Nova Categoria foi criada com sucesso.",
          })
        );
        dispatch(fetchAndSetCategories({ token: params.token }));
        console.log("Filtered Categories: ", response.data.categories);
      } else {
        dispatch(
          categoriesActions.setRequestResult({
            status: "error",
            message: response.data.message,
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        categoriesActions.setRequestResult({
          status: "error",
          message: "Houve um erro ao tentar criar a nova categoria.",
        })
      );
    }

    dispatch(categoriesActions.setIsSendingRequest(false));
  };
};

export const updateCategory = (params: any) => {
  return async (dispatch: any) => {
    dispatch(categoriesActions.setIsSendingRequest(true));
    try {
      const response = await axios.put(
        `${options.baseURL}/api/v1/category/${params.id}`,
        params.formData,
        {
          headers: {
            Authorization: `Bearer ${params.token}`,
          },
        }
      );

      if (response.status === 200) {
        //
        dispatch(
          categoriesActions.setRequestResult({
            status: "success",
            message: "A Categoria foi atualizada com sucesso.",
          })
        );
        dispatch(fetchAndSetCategories({ token: params.token }));
        console.log("Filtered Categories: ", response.data.categories);
      } else {
        dispatch(
          categoriesActions.setRequestResult({
            status: "error",
            message: response.data.message,
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        categoriesActions.setRequestResult({
          status: "error",
          message: "Houve um erro ao tentar atualizar a categoria.",
        })
      );
    }

    dispatch(categoriesActions.setIsSendingRequest(false));
    dispatch(categoriesActions.setEditCategoryId(null));
  };
};

export const setRequestResult = (params: any) => {
  return (dispatch: any) => {
    dispatch(
      categoriesActions.setRequestResult({
        status: params.status,
        message: params.message,
      })
    );
  };
};

export const setEditCategoryId = (id: number | null) => {
  return (dispatch: any) => {
    dispatch(categoriesActions.setEditCategoryId(id));
  };
};

export const resetFilteredCategories = () => {
  return (dispatch: any) => {
    dispatch(categoriesActions.setFilteredCategories([]));
  };
};
