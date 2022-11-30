function NavbarComponent() {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* <!-- Left navbar links --> */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      {/* <!-- Right navbar links --> */}
      <ul className="navbar-nav ml-auto">
        {/* <!-- Navbar Search --> */}

        {/* <!-- Messages Dropdown Menu -->

      <!-- Notifications Dropdown Menu --> */}
        {/* <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#">
            <i className="far fa-bell"></i>
            <span className="badge badge-danger navbar-badge"></span>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span className="dropdown-item dropdown-header"></span>
            <div className="dropdown-divider"></div>
            <a href="#" className="dropdown-item">
              <i className="fas fa-envelope mr-2"></i>
              MENSAGENS nova(s) mensagem(ns)
            </a>

            <div className="dropdown-divider"></div>
            <a href="/mailbox" className="dropdown-item dropdown-footer">
              Ver Mensagens
            </a>
          </div>
        </li> */}
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="fullscreen"
            href="#"
            role="button"
          >
            <i className="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarComponent;
