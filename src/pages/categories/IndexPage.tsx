import { useEffect, useState, useRef, FormEvent } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import ReactDOM from "react-dom";
import AuthContext from "../../store/auth";

import {
  fetchAndSetCategories,
  fetchAndSetFilteredCategories,
} from "../../store/redux/categories-actions";
import { useAppDispatch } from "../../store/redux";

import AutocompleteComponent from "../../components/ui/AutocompleteComponent";

const ModalOverlay = (props: any) => {
  return (
    <div className="modal fade" tabIndex={-1} role="dialog" id="exampleModal">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Nova Categoria</h5>
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
            <form>
              <div className="form-group">
                <label htmlFor="categoryName">Nome da Categoria</label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  placeholder="Ex.: Banco de Dados"
                />
              </div>
              <div className="form-group ">
                <label htmlFor="parentCategory">Categoria Principal</label>
                <AutocompleteComponent
                  items={props.filteredCategories}
                  setValue={props.searchFilteredCategoriesHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Tecnologia da Informação"
                  maxLength={300}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              onClick={props.onSubmitHandler}
              type="button"
              className="btn btn-primary"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoriesIndexPage = () => {
  const categories = useSelector((state: any) => state.categories.categories);
  const filteredCategories = useSelector(
    (state: any) => state.categories.filteredCategories
  );
  const dispatch = useAppDispatch();
  const context = useContext(AuthContext);

  const [parentCategoryName, setParentCategoryName] = useState<string>("");
  const [selectedParentCategory, setSelectedParentCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchAndSetCategories({ token: context?.token }));
    console.log("Categories: ", categories);
  }, [dispatch]);

  function searchFilteredCategoriesHandler(categoryName: string) {
    if (categoryName.length >= 3) {
      dispatch(
        fetchAndSetFilteredCategories({
          search: categoryName,
          token: context?.token,
        })
      );
    }
    setParentCategoryName(categoryName);
  }

  function selectedParentCategoryHandler(category: any) {
    setSelectedParentCategory(category);
  }
  function onSubmitHandler() {
    //

    console.log("Submiting form...");
    console.log("Parent category: ", parentCategoryName);
  }

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
        <ModalOverlay
          filteredCategories={filteredCategories}
          searchFilteredCategoriesHandler={searchFilteredCategoriesHandler}
          onSubmitHandler={onSubmitHandler}
        />,
        document.getElementById("overlay-root") as Element
      )}

      <div className="accordion" id="accordionExample">
        {categories.map((cat: any) => (
          <div className="card">
            <div className="card-header" id="headingOne">
              <h2 className="mb-0">
                <button
                  className="accordion-button d-flex justify-content-between btn btn-link btn-block text-left"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  {cat.name}
                </button>
              </h2>
            </div>

            <div
              id="collapseOne"
              className="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
            >
              <div className="card-body">{cat.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesIndexPage;
