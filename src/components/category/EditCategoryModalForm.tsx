import React, { useEffect, useState, useRef, useReducer } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../store/auth";
import { useAppDispatch } from "../../store/redux";
import {
  fetchAndSetFilteredCategories,
  updateCategory,
  setRequestResult,
  resetFilteredCategories,
  setEditCategoryId,
} from "../../store/redux/categories-actions";
import AutocompleteComponent from "../ui/AutocompleteComponent";
import SpinnerComponent from "../ui/SpinnerComponent";

interface FormState {
  categoryNameState: { value: string; isValid: boolean };
  parentCategoryState: { value: string; isValid: boolean; id: number | null };
  categoryDescriptionState: { value: string; isValid: boolean };
  formIsValid: boolean;
}

let initialState = {
  categoryNameState: { value: "", isValid: false },
  parentCategoryState: { value: "", isValid: false, id: 0 },
  categoryDescriptionState: { value: "", isValid: false },
  formIsValid: false,
} as FormState;

const formReducer = (state: any, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "INIT_FORM": {
      const category = action.payload;
      //console.log("Selected Edit Category: ", category);
      if (category) {
        initialState = {
          categoryNameState: { value: category.name, isValid: true },
          parentCategoryState: {
            value: category.parent ? category.parent.name : "",
            isValid: true,
            id: category.parent ? category.parent.id : null,
          },
          categoryDescriptionState: {
            value: category.description,
            isValid: true,
          },
          formIsValid: true,
        };
      }
      return { ...initialState };
    }
    case "CATEGORY_NAME": {
      const value = action.payload;
      ///console.log("Category state: ", value);
      return {
        ...state,
        categoryNameState: { value, isValid: value ? true : false },
        formIsValid:
          value &&
          state.parentCategoryState.isValid &&
          state.categoryDescriptionState.isValid,
      };
    }
    case "PARENT_CATEGORY": {
      const value = action.payload.value;
      //console.log("Parent Category: ", value);
      return {
        ...state,
        parentCategoryState: {
          value,
          isValid: value ? true : false,
          id: action.payload.parentId ? action.payload.parentId : 0,
        },
        formIsValid:
          value &&
          state.categoryNameState.isValid &&
          state.categoryDescriptionState.isValid,
      };
    }
    case "CATEGORY_DESCRIPTION": {
      const value = action.payload;
      return {
        ...state,
        categoryDescriptionState: { value, isValid: value ? true : false },
        formIsValid:
          value &&
          state.categoryNameState.isValid &&
          state.parentCategoryState.isValid,
      };
    }
    case "CLEAR_FORM": {
      return { ...initialState };
    }
    case "DISMISS_FORM": {
      return { ...initialState };
    }
    default:
      return { ...state };
  }
};

const EditCategoryModalForm = (props: any) => {
  const categories = useSelector((state: any) => state.categories.categories);
  const buttonCloseRef = useRef<HTMLButtonElement>(null);
  const isSendingRequest = useSelector(
    (state: any) => state.categories.isSendingRequest
  );
  const isLoadingFiltered = useSelector(
    (state: any) => state.categories.isLoadingFiltered
  );
  const [parentCategoryName, setParentCategoryName] = useState<string>("");
  const dispatch = useAppDispatch();
  const context = useContext(AuthContext);
  const editCategoryId = useSelector(
    (state: any) => state.categories.editCategoryId
  );

  const [formState, formDispatch] = useReducer(formReducer, initialState);
  const filteredCategories = useSelector(
    (state: any) => state.categories.filteredCategories
  );

  const requestResult = useSelector(
    (state: any) => state.categories.requestResult
  );

  const onCategoryNameChangeHandler = (event: any) => {
    formDispatch({ type: "CATEGORY_NAME", payload: event.target.value });
  };

  const onParentCategoryChangeHandler = (value: string) => {
    //console.log("onParentCategoryChangeHandler: ", value);
    if (value.length >= 3) {
      dispatch(
        fetchAndSetFilteredCategories({ search: value, token: context?.token })
      );
    }
    formDispatch({ type: "PARENT_CATEGORY", payload: { value } });
  };
  const onCategoryDescriptionChangeHandler = (event: any) => {
    formDispatch({ type: "CATEGORY_DESCRIPTION", payload: event.target.value });
  };

  function selectedParentCategoryHandler(parentId: number) {
    console.log("selectedParentCategoryHandler:", parentId);
    const category = filteredCategories.find((cat: any) => cat.id === parentId);

    formDispatch({
      type: "PARENT_CATEGORY",
      payload: { value: category.name, parentId: category.id },
    });
  }

  function dismissModal() {
    formDispatch({ type: "DISMISS_FORM" });
  }
  function onSubmitHandler() {
    dispatch(
      updateCategory({
        id: editCategoryId,
        formData: {
          name: formState.categoryNameState.value,
          parent: formState.parentCategoryState.id
            ? formState.parentCategoryState.id
            : null,
          description: formState.categoryDescriptionState.value,
        },
        token: context?.token,
      })
    );
  }

  useEffect(() => {
    if (!isSendingRequest && requestResult.status === "success") {
      //console.log("Message: ", requestResult.message);
      toast.success("Categoria alterada com sucesso.", {
        containerId: "edit",
      });
      setTimeout(() => {
        // formDispatch({ type: "CLEAR_FORM" });
        onParentCategoryChangeHandler("");
        toast.dismiss();
        buttonCloseRef.current!.click();
      }, 3500);
    } else if (!isSendingRequest && requestResult.status === "error") {
      //console.log("An error has occurred. ");
      toast.success("Houve um erro ao tentar salvar a categoria.", {
        containerId: "edit",
      });
      setTimeout(() => {
        toast.dismiss();
        buttonCloseRef.current!.click();
      }, 3500);
    }

    return () => {
      dispatch(setRequestResult({ status: "", message: "" }));
    };
  }, [isSendingRequest]);

  useEffect(() => {
    const timerIdentifier = setTimeout(() => {
      if (
        formState.parentCategoryState.value &&
        formState.parentCategoryState.value.length >= 3
      ) {
        //console.log("searching in timeout");
        dispatch(
          fetchAndSetFilteredCategories({
            search: formState.parentCategoryState.value,
            token: context?.token,
          })
        );
      }
    }, 1000);

    setParentCategoryName(formState.parentCategoryState.value);

    return () => {
      clearTimeout(timerIdentifier);
    };
  }, [formState.parentCategoryState]);

  useEffect(() => {
    if (editCategoryId) {
      const category = categories.find((cat: any) => cat.id === editCategoryId);

      formDispatch({ type: "INIT_FORM", payload: category });
    }
  }, [editCategoryId]);

  useEffect(() => {
    return () => {
      if (!editCategoryId) {
        dispatch(resetFilteredCategories());
      }
    };
  }, [editCategoryId]);

  useEffect(() => {
    return () => {
      setEditCategoryId(null);
    };
  }, []);
  return (
    <div
      className="modal fade"
      tabIndex={-1}
      role="dialog"
      id="editCategoryModal"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Alterar Categoria</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <ToastContainer
              enableMultiContainer
              containerId={"edit"}
              autoClose={3000}
            />
            <form>
              <div className="form-group">
                <label htmlFor="categoryName">Nome da Categoria</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  placeholder="Ex.: Banco de Dados"
                  value={formState.categoryNameState.value}
                  onChange={onCategoryNameChangeHandler}
                />
              </div>
              <div className="form-group ">
                <label htmlFor="parentCategory">Categoria Principal</label>
                <AutocompleteComponent
                  items={filteredCategories}
                  setValue={onParentCategoryChangeHandler}
                  selectItem={selectedParentCategoryHandler}
                  caption={formState.parentCategoryState.value}
                  isLoading={isLoadingFiltered}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Tecnologia da Informação"
                  maxLength={300}
                  onChange={onCategoryDescriptionChangeHandler}
                  value={formState.categoryDescriptionState.value}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            {isSendingRequest && <SpinnerComponent />}

            {!isSendingRequest && (
              <React.Fragment>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  ref={buttonCloseRef}
                  onClick={dismissModal}
                >
                  Fechar
                </button>
                <button
                  onClick={onSubmitHandler}
                  type="button"
                  className="btn btn-primary"
                >
                  Salvar
                </button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModalForm;
