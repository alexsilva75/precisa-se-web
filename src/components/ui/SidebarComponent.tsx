import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import cssStyles from "./SidebarComponent.module.css";

import AuthContext from "../../store/auth";
function SidebarComponent() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authContext?.logout();
    navigate("/");
  };
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* <!-- Brand Logo --> */}
      <a href="index3.html" className="brand-link">
        <span className="brand-text font-weight-light">Precisa-se!</span>
      </a>

      {/* <!-- Sidebar --> */}
      <div className="sidebar">
        {/* <!-- Sidebar user panel (optional) --> */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="/dist/img/circle-user-solid.svg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <Link to="/dashboard" className="d-block">
              {authContext?.user?.username}
            </Link>
            <span className="text-light">
              Não é você?&nbsp;
              <a
                className="text-danger"
                id="logout-link"
                onClick={logoutHandler}
              >
                Sair
              </a>
            </span>
          </div>
        </div>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library --> */}
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <i className="nav-icon fas fa-solid fa-house-user"></i>
                <p>Início</p>
              </Link>
            </li>

            {/* <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-solid fa-user"></i>
                <p>
                  Minha Conta
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Perfil</p>
                  </a>
                </li>
              </ul>
            </li> */}
            <li className="nav-item">
              <Link to="/dashboard/users?firstInitial=A" className="nav-link">
                <i className="nav-icon fas fa-user"></i>
                <p>
                  Usuários
                  {/* <!-- <span class="right badge badge-danger">New</span> --> */}
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/import-users" className="nav-link">
                <i className="nav-icon fas fa-screwdriver"></i>
                <p>
                  Habilidades
                  {/* <!-- <span class="right badge badge-danger">New</span> --> */}
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/import-users" className="nav-link">
                <i className="nav-icon fas fa-user-ninja"></i>
                <p>
                  Especialidades
                  {/* <!-- <span class="right badge badge-danger">New</span> --> */}
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/import-users" className="nav-link">
                <i className="nav-icon fas fa-briefcase"></i>
                <p>
                  Projetos
                  {/* <!-- <span class="right badge badge-danger">New</span> --> */}
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/import-users" className="nav-link">
                <i className="nav-icon fas fa-money-bill"></i>
                <p>
                  Pagamentos
                  {/* <!-- <span class="right badge badge-danger">New</span> --> */}
                </p>
              </Link>
            </li>

            {/* <li className="nav-item">
              <a href="/transactions" className="nav-link">
                <i className="nav-icon fas fa-shopping-cart"></i>
                <p>
                  Pedidos
                  <span className="right badge badge-danger">New</span>
                </p>
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a href="/quota-products" className="nav-link">
                <i className="nav-icon fas fa-box"></i>
                <p>Pacotes de Dados</p>
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a href="/quota" className="nav-link">
                <i className="nav-icon fas fa-chart-pie"></i>
                <p>Cota Diária</p>
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon far fa-envelope"></i>
                <p>
                  Mensagens
                  <span className="badge badge-info">NOTIFICACOES</span>
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/inbox/UNREAD" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Caixa de Entrada</p>
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default SidebarComponent;
