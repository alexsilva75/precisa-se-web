import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container-fluid">
      <div className="row m-4">
        <div className="col-12">
          <div className="info-box mb-3 bg-danger">
            <span className="info-box-icon">
              <i className="fas fa-stop-circle"></i>
            </span>

            <div className="info-box-content p-5">
              <span className=" display-4">
                A página que você procurou não existe neste servidor
              </span>
              <span className="info-box-number">
                <Link to="/dashboard" className="text-white lead">
                  Clique Aqui para voltar à Página Inicial.
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
