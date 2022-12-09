import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../store/auth";
import NewCategoryModalForm from "../../components/category/NewCategoryModalForm";
import EditCategoryModalForm from "../../components/category/EditCategoryModalForm";
import PaginationComponent from "../../components/ui/PaginationComponent";
import {
  fetchAndSetCategories,
  setEditCategoryId,
  resetFilteredCategories,
} from "../../store/redux/categories-actions";
import { useAppDispatch } from "../../store/redux";

import SpinnerComponent from "../../components/ui/SpinnerComponent";

const CategoriesIndexPage = () => {
  const categories = useSelector((state: any) => state.categories.categories);
  const isLoading = useSelector((state: any) => state.categories.isLoading);
  const paginationData = useSelector(
    (state: any) => state.categories.paginationData
  );
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useAppDispatch();
  const context = useContext(AuthContext);

  const setSelectedEditCategoryHandler = (id: number) => {
    dispatch(setEditCategoryId(id));
    resetFilteredCategoriesHandler();
  };

  const resetFilteredCategoriesHandler = () => {
    dispatch(resetFilteredCategories());
  };

  useEffect(() => {
    console.log("Searching page: ", currentPage);
    dispatch(
      fetchAndSetCategories({ token: context?.token, page: currentPage })
    );
    // console.log("Categories: ", categories);
  }, [dispatch, currentPage]);

  useEffect(() => {
    //console.log("Is Loading: ", isLoading);
  }, [isLoading]);

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Button
        </button>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={resetFilteredCategoriesHandler}
      >
        Nova Categoria
      </button>

      {ReactDOM.createPortal(
        <NewCategoryModalForm />,
        document.getElementById("overlay-root") as Element
      )}

      {ReactDOM.createPortal(
        <EditCategoryModalForm />,
        document.getElementById("overlay-root") as Element
      )}

      {isLoading && <SpinnerComponent />}
      {!isLoading && (
        <div className="accordion mt-4" id="accordionExample">
          {categories.map((cat: any) => (
            <div key={cat.id} className="card">
              <div className="card-header" id={`heading-${cat.id}`}>
                <h2 className="mb-0">
                  <button
                    className="accordion-button collapsed d-flex justify-content-between btn btn-link btn-block text-left"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#collapse-${cat.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse-${cat.id}`}
                  >
                    {cat.name}
                  </button>
                </h2>
              </div>

              <div
                id={`collapse-${cat.id}`}
                className="collapse"
                aria-labelledby={`heading-${cat.id}`}
                data-parent="#accordionExample"
              >
                <div className="card-body">{cat.description}</div>
                <div className="d-flex justify-content-end p-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#editCategoryModal"
                    onClick={setSelectedEditCategoryHandler.bind(this, cat.id)}
                  >
                    Editar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {categories && categories.length > 0 && !isLoading && (
        <PaginationComponent
          currentPage={paginationData.currentPage}
          prevPage={paginationData.prevPage}
          nextPage={paginationData.nextPage}
          setPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CategoriesIndexPage;
