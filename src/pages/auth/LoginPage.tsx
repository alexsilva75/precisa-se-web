import React, {
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  LegacyRef,
  useContext,
  useEffect,
} from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth";

import SpinnerComponent from "../../components/ui/SpinnerComponent";
const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const passwordInputRef = useRef<HTMLInputElement>();

  function onSubmitHandler(event: FormEvent) {
    event.preventDefault();
    const password = (passwordInputRef.current as HTMLInputElement).value;
    authContext?.setAuthError(false);
    setIsLoading(true);
    authContext
      ?.authenticate(username, password)
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) =>
        console.log(
          "Não foi possível autenticar. Usuário e/ou senha incorretos."
        )
      );
  }

  function onUsernameInputChangeHandler(event: ChangeEvent) {
    const usernameValue = (event.target as HTMLInputElement)!.value;
    //console.log(usernameValue);

    setUsername(usernameValue);
  }

  useEffect(() => {
    ///console.log("User is Authenticated: ", authContext?.isAuthenticated);

    authContext?.tryAutoLogin();
    if (authContext?.authError) {
      toast.error(
        "Não foi possível autenticar. Usuário e/ou senha incorretos."
      );
    }

    if (authContext?.isAuthenticated) {
      //console.log("Is authenticated: ", authContext?.isAuthenticated);
      navigate("/dashboard");
    }
  }, [authContext?.authError, authContext?.isAuthenticated]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 flex-1 mt-5">
          <h1 className="text-center">Precisa-se</h1>
          <h2 className="h4 text-muted text-center">Acesso Administrativo</h2>
          <ToastContainer />
          <div className="card">
            <div className="card-body">
              <h2 className="h5">Informe Usuário e Senha</h2>
              <form onSubmit={onSubmitHandler}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Usuário
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onUsernameInputChangeHandler}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Senha
                  </label>
                  <input
                    type="password"
                    v-model="password"
                    className="form-control"
                    ref={passwordInputRef as LegacyRef<HTMLInputElement>}
                  />
                </div>
                {isLoading ? (
                  <SpinnerComponent />
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Entrar
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
