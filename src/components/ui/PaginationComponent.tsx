import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cssStyles from "./PaginationComponent.module.css";
//import {Link} from 'react-router-dom'
//import { fetchAndSetCategories } from "../../store/redux/categories-actions";
const PaginationComponent = (props: any) => {
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    setCurrentPage(props.currentPage);
  }, []);
  function setCurrentPageHandler(pageNumber: number) {
    console.log("Changing page to: ", pageNumber);
    props.setPage(pageNumber);
  }
  return (
    <div className="paginator d-flex justify-content-center flex-">
      {props.prevPage && (
        <a
          className={cssStyles.paginatorLink}
          onClick={setCurrentPageHandler.bind(this, props.prevPage)}
        >
          Anterior
        </a>
      )}
      {props.currentPage && (
        <span className={cssStyles.paginatorCurrent}>{props.currentPage}</span>
      )}
      {props.nextPage && (
        <a
          className={cssStyles.paginatorLink}
          onClick={setCurrentPageHandler.bind(this, props.nextPage)}
        >
          Próxima
        </a>
      )}
    </div>
  );
};

export default PaginationComponent;
