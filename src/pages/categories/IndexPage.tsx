import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../store/auth";
import NewCategoryModalForm from "../../components/category/NewCategoryModalForm";
import { fetchAndSetCategories } from "../../store/redux/categories-actions";
import { useAppDispatch } from "../../store/redux";

import SpinnerComponent from "../../components/ui/SpinnerComponent";

const CategoriesIndexPage = () => {
  const categories = useSelector((state: any) => state.categories.categories);
  const isLoading = useSelector((state: any) => state.categories.isLoading);

  const dispatch = useAppDispatch();
  const context = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchAndSetCategories({ token: context?.token }));
    // console.log("Categories: ", categories);
  }, [dispatch]);

  useEffect(() => {
    console.log("Is Loading: ", isLoading);
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
      >
        Nova Categoria
      </button>

      {ReactDOM.createPortal(
        <NewCategoryModalForm />,
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesIndexPage;
