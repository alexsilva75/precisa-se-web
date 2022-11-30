import { Outlet, useNavigate } from "react-router-dom";
import NavbarComponent from "../components/ui/NavbarComponent";
import SidebarComponent from "../components/ui/SidebarComponent";
import DashboardContentBase from "../components/DashboardContentBase";
import FooterComponent from "../components/ui/FooterComponent";
import AuthContext from "../store/auth";
import { useContext, useEffect, useState } from "react";
import SpinnerComponent from "../components/ui/SpinnerComponent";

function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext?.isAuthenticated) {
      //console.log("Redirecting....");
      navigate("/login");
    }
    //console.log("Is Logged in: ", authContext?.isAuthenticated);
    setIsLoading(false);
  }, [authContext?.isAuthenticated]);

  if (!isLoading) {
    return (
      <div className="wrapper">
        <NavbarComponent />
        <SidebarComponent />
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Painel de Controle</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <DashboardContentBase>
            <Outlet />
          </DashboardContentBase>
        </div>
        <FooterComponent />
      </div>
    );
  } else {
    return <SpinnerComponent />;
  }
}

export default DashboardPage;
