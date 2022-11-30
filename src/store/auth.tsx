import React, { createContext, PropsWithChildren, useState } from "react";
import { redirect } from "react-router-dom";

import axios from "axios";
import options from "../globalOptions";
import type User from "../models/user";

interface AuthContextInterface {
  isAuthenticated: boolean;
  user: User | null;
  token: string;
  authenticate: (username: string, password: string) => Promise<any>;
  authError: boolean;
  authErrorMessage: string;
  setAuthError: (hasErrors: boolean) => void;
  timer: number | any;
  tryAutoLogin: () => void;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

interface AuthProps {
  children: React.ReactNode;
}

export const AuthContextProvider = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");
  const [authError, setAuthError] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [timer, setTimer] = useState(0);

  const context: AuthContextInterface = {
    isAuthenticated,
    user,
    token,
    authenticate,
    authError,
    authErrorMessage,
    setAuthError,
    timer,
    tryAutoLogin,
    setToken,
    setUser,
    logout,
  };

  function authenticate(username: string, password: string): Promise<any> {
    try {
      return axios
        .post(
          `${options.baseURL}/api/v1/login`,
          {
            username,
            password,
          },
          {
            headers: {
              Accept: "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        )
        .then((response) => {
          //console.log("Login response: ", response);
          setToken(response.data.token);

          return axios
            .post(
              `${options.baseURL}/api/v1/jwt`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${response.data.token}`,
                },
              }
            )
            .then((userDataResponse) => {
              // console.log("Decoded Token: ", userDataResponse);

              setIsAuthenticated(true);
              setAuthError(false);
              setAuthUser({
                ...userDataResponse.data.decoded_token,
                user: userDataResponse.data.user,
                token: response.data.token,
              });
              redirect("/dashboard");
            })
            .catch((error) => {
              //console.log("Error Fetching Decoded Token: ", error);
            });

          //return response;
        })
        .catch((error) => {
          setAuthError(true);
          // console.log("Authentication error: ", error);
        });
    } catch (error) {
      //console.log("Login Error: ", error);
      throw new Error("Falha ao autenticar.");
    }
  }

  async function setAuthUser(authData: any) {
    //
    //const tokenCreationDatetime = new Date(authData.iat * 1000); //in seconds
    //console.log("Auth User Data: ", authData);

    const tokenExpirationDatetime = new Date(
      +authData.exp * 1000 // O token tem vida de 1 hora
    );

    const nowTimeInMillis = new Date().getTime();
    const tokenExpirationTimeInMillis = tokenExpirationDatetime.getTime();

    if (tokenExpirationTimeInMillis >= nowTimeInMillis + 60000) {
      setUser(authData.user);
      const token =
        authData.token && authData.token.split("|")[1]
          ? authData.token.split("|")[1]
          : authData.token;
      //console.log("Auth Token: ", token);
      setToken(token);

      if (authData.user) {
        localStorage.setItem("user", JSON.stringify(authData.user));
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", `${authData.exp}`);
      } else {
        localStorage.clear();
      }

      setTimer(
        setTimeout(() => {
          logout();
        }, tokenExpirationTimeInMillis - nowTimeInMillis) as any
      );
    } else {
      logout();
    }
  }

  function tryAutoLogin() {
    //
    //console.log("Trying to auto login.");
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    setToken(token as string);

    //console.log("Auto Login token: ", token);

    if (!user || !token) {
      localStorage.clear();
      setIsAuthenticated(false);
    } else {
      const parsedUser = JSON.parse(user);
      setAuthUser({
        user: parsedUser,
        token,
        exp: tokenExpiration,
      });
      setIsAuthenticated(true);
      redirect("/dashboard");
    }
  }

  function logout() {
    axios
      .post(
        `${options.baseURL}/api/v1/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        }
      )
      .then((response) => {
        localStorage.clear();
        //console.log("Logging out: ", response);

        clearTimeout(context.timer);
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch((_) => {
        clearTimeout(context.timer);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.clear();
      });
  }

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
