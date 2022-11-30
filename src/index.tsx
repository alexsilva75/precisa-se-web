import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardHomePage from "./pages/DashboardHomePage";
import UsersIndexPage from "./pages/users/IndexPage";
import { AuthContextProvider } from "./store/auth";

import { Provider } from "react-redux";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  redirect,
  Navigate,
} from "react-router-dom";

import store from "./store/redux";
import DetailPage from "./pages/users/DetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    loader: () => {},
    children: [
      {
        path: "",
        element: <DashboardHomePage />,
      },
      {
        path: "users",
        element: <UsersIndexPage />,
      },
      {
        path: "users/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

// axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
